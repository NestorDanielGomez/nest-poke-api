import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {



  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpPropio: AxiosAdapter
  ) {

  }

  async executeSeed() {
    //vacio la DB antes de llenarla, para que no tenga errores de registros existentes.
    await this.pokemonModel.deleteMany({})

    const data = await this.httpPropio.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=100`)

    const pokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach(async ({ name, url }) => {
      const segmets = url.split("/")
      const no: number = +segmets[segmets.length - 2]

      pokemonToInsert.push({ name, no })

    })
    await this.pokemonModel.insertMany(pokemonToInsert)
    return ' Seed Ejecutada, se acaba de llenar la DB'
  }


}