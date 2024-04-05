import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    GetAssociatedDTO,
    Associated,
    ModifyAssociatedDTO,
    User
} from 'src/app/dtos';
import { IPATIENTS } from 'src/app/interfaces';

const API = 'patient/associates/';

@Injectable({
  providedIn: 'root'
})
export class AssociatesService implements IPATIENTS {

  constructor(
    private http: HttpClient
  ) { }

  addAssociated = (body: any) => this.http.post<GetAssociatedDTO>(`${API}new_associated`, body).toPromise();

  getAll = (user_id: number, page: number | undefined = undefined) => 
    page === undefined ? this.http.get<GetAssociatedDTO | User[]>(`${API}getAll/${user_id}`).toPromise()
    : this.http.get<GetAssociatedDTO | User[]>(`${API}getAll/${user_id}/${page}`).toPromise();

  getAssociated = (user_id: number) => this.http.get<Associated>(`${API}getAssociated/${user_id}`);

  modifyAssociated = (body: ModifyAssociatedDTO) => this.http.put<Associated>(`${API}modifyAssociated`, body);
}
