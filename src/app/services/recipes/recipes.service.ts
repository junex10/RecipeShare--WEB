import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RecipesDTO,
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


  newRecipe = (body: any) => this.http.post<RecipesDTO>(`${API}new`, body).toPromise();
  getRecipe = (body: any) => this.http.post<any>(`${API}`, body).toPromise();
  removeRecipe = (body: any) => this.http.post<any>(`${API}remove`, body).toPromise();
  updateRecipe = (body: any) => this.http.post<any>(`${API}update`, body).toPromise();

}
