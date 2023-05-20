import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }



public save(user: Usuarios): Observable<any>{
  return this.http.post<any>("http://127.0.0.1:8000/admin/auth/user/add/" + 'create', user);
}

}
