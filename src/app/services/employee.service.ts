import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_API = 'http://localhost:4000/api/employees'
  selectedEmployee: Employee = {
    name: '',
    position: '',
    office: '',
    salary: 0
  };
  employees : Employee[];

  constructor(private _http: HttpClient) { }

  getEmployees() {
    return this._http.get<Employee[]>(this.URL_API);
  }

  createEmployee(employee: Employee){
    return this._http.post(this.URL_API, employee);
  }

  updateEmployee(employee: Employee) {
    return this._http.put(`${this.URL_API}/${employee._id}`, employee)
  }

  deleteEmployee(_id: string) {
    return this._http.delete(`${this.URL_API}/${_id}`)
  }
}
