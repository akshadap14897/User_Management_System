import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }


  getUsers() {
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res: any) => {
      return res;
    }));
  }
  updateUsers(Id: number, data: any) {
    return this._http.put<any>("http://localhost:3000/posts/"+Id, data).pipe(map((res: any) => {
      return res;
    }));
  }
  deleteUsers(Id: number) {
    return this._http.delete<any>("http://localhost:3000/posts/"+Id).pipe(map((res: any) => {
      return res;
    }))
  }


  AddsUserinfo(data:any){
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  checkEmailExistence(email: string): Observable<boolean> {
    return this._http.get<any[]>(`${"http://localhost:3000/posts"}?email=${email}`).pipe(
      map(users => {
        return users.length > 0;
      })
    );
  }

 
}
