import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  NewRecipeDTO,
} from 'src/app/dtos';
import { IRECIPE } from 'src/app/interfaces';

const API = 'recipe/';

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements IRECIPE {

  constructor(
    private http: HttpClient
  ) { }


  newRecipe = (body: any) => this.http.post<NewRecipeDTO>(`${API}new`, body).toPromise();

}
