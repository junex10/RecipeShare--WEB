import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RecipesDTO,
} from 'src/app/dtos';
import { IHOME } from 'src/app/interfaces';

const API = 'home/';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements IHOME {

  constructor(
    private http: HttpClient
  ) { }

  getRecipes = (body: any) => this.http.post<any>(`${API}`, body).toPromise();

}
