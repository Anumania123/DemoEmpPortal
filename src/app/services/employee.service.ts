import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class EmployeeService {
  apiUrl: string = 'https://jsonplaceholder.typicode.com/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}
  editUser(employee: Employee) {
    return this.httpClient.put(
      this.apiUrl + 'UpdateEmployeeDetails/',
      employee
    );
  }
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.apiUrl}`);
  }
  update(id): Observable<Employee> {
    return this.httpClient
      .put<Employee>(this.apiUrl + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  updateUser(user: Employee): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.put<string>(
      `${this.apiUrl}/UpdateEmployeeDetails/`,
      user,
      httpOptions
    );
  }

  delete(id) {
    return this.httpClient
      .delete<Employee>(this.apiUrl + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error) {
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
