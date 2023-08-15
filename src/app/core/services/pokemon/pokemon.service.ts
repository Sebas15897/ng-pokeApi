import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { HttpClient } from '@angular/common/http';
import { IPokemon } from '../../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) {}

  getPokemonByname(name: string) {
    const url = `${this.appSettings.pokemons.urls.pokemon}${name}`;
    return this.httpClient.get<IPokemon>(url);
  }
}
