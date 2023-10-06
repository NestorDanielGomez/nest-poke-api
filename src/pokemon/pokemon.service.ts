import { ConfigService } from '@nestjs/config';
import { BadRequestException, Delete, Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';



@Injectable()
export class PokemonService {

  private defaultLimit: number
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = configService.get<number>('default_limit')
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      console.log(pokemon)
      return pokemon;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    // si viene usa limit/offset si no viente toma 10 y 0
    const { limit = this.defaultLimit, offset = 0 } = paginationDto
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 }) //ordeno por n0 ascente     
      .select("-__v") //no traigo el __V que no lo necesito
  }

  async findOne(searchtype: string) {

    let pokemon: Pokemon;

    //por numero
    if (!isNaN(+searchtype)) { pokemon = await this.pokemonModel.findOne({ no: searchtype }) }

    //por mongoID
    if (!pokemon && isValidObjectId(searchtype)) { pokemon = await this.pokemonModel.findById(searchtype) }

    //por nombre
    if (!pokemon) { pokemon = await this.pokemonModel.findOne({ name: searchtype.toLowerCase().trim() }) }

    if (!pokemon) { throw new NotFoundException(`pokemon con el id, nombre o no ${searchtype} no encontrado`) }
    // return `This action returns 1 puto pokemon`;
    return pokemon;

  }

  async update(searchtype: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(searchtype)
    updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
    try {
      await pokemon.updateOne(updatePokemonDto)
      //para que devuelva el pokemon actualizado, esparso todas las props que tiene y las sobreescribo
      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {
      this.handleExceptions(error)
    }
  }


  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon con el ${id} no fue encontrado para borrar`)
    }
    return
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`El Pokemon ${JSON.stringify(error.keyValue)}ya existe en la BD`);
    }
    throw new InternalServerErrorException(`No se pudo crear el poquemon - chequear Logs Server`);
  }

}
