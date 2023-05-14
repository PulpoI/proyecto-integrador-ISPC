import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials:LoginRequest):Observable<User>{
    return this.http.get<User>('././db.json')
   
  }
}
