import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { UserInterface } from '../models/user.interfase';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  // for the local middleware  endpoint: 'http://localhost:8000/api';

  endpoint: 'http://hello-world.innocv.com/api/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Add Users
  AddUser(data: UserInterface): Observable<any> {
    // for the local middleware   const API_URL = `${this.endpoint}/add-user`;
    const API_URL = 'http://hello-world.innocv.com/api/user';
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  // Get all users
  GetUsers() {
    return this.http.get('http://hello-world.innocv.com/api/user');
  }

  // Get Users
  GetUser(id): Observable<any> {
    // for the local middleware   const API_URL = `${this.endpoint}/read-user/${id}`;
    const API_URL = `http://hello-world.innocv.com/api/user/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update Users
  updateUser(data: UserInterface): Observable<any> {
    // for the local middleware  const API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put('http://hello-world.innocv.com/api/user', data);
  }

  // Delete Users
  DeleteUser(id): Observable<any> {
    // for the local middleware      const API_URL = `${this.endpoint}/delete-user/${id}`;

    const API_URL = `http://hello-world.innocv.com/api/user/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
