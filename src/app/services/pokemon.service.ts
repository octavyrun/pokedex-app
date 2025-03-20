import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}


  getAllPokemon(limit: number = 151): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=0`);
  }

  getPokemonDetails(nameOrId: string | number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${nameOrId}`);
  }
}
