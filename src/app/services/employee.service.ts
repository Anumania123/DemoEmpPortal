import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class EmployeeService {
  apiUrl: string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}
  editUser(employee: Employee) {
    return this.http.put(this.apiUrl + 'UpdateEmployeeDetails/', employee);
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }
}
