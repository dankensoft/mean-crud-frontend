import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe(
      (res) => {
        this._employeeService.employees = res;
      },
      (err) => console.error(err)
    )
  }

  addEmployee(form: NgForm) {
    if(form.value._id){
      // console.log('Updating...');
      this._employeeService.updateEmployee(form.value).subscribe(
        (res) => {
          this.getEmployees();
          form.reset();
        },
        (err) => console.error(err)
      )
    }else{
      this._employeeService.createEmployee(form.value).subscribe(
        (res) => {
          this.getEmployees();
          form.reset();
        },
        (err) => console.error(err)
      )
    }
  }

  deleteEmployee(id: string) {
    const res = confirm('Are you sure you want to delete it?')
    if(res){
      this._employeeService.deleteEmployee(id).subscribe(
        (res) => {
          this.getEmployees();
        },
        (err) => console.error(err)
      )
    }
  }

  editEmployee(employee: Employee) {
    // Selecciona la información del registro seleccionado y lo plasma en el Formulario para su Actualización
    this._employeeService.selectedEmployee = employee;
  }

}
