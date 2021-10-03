import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services';
import { Employee } from '../model/employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  createCustomerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private employeeService: EmployeeService
  ) {
    this.createCustomerForm = formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      phone: [''],
      email: ['', Validators.email],
      age: [
        '',
        [Validators.min(0), Validators.max(100), Validators.pattern('^[0-9]*')],
      ],
      address: [],
    });
  }

  ngOnInit() {}

  createCustomer() {
    console.log('create button clicked');
    console.log('form value ' + JSON.stringify(this.createCustomerForm.value));

    if (this.createCustomerForm.valid) {
      this.toastr.successToastr('This is a vaild form.', 'Success!');
    } else {
      this.toastr.warningToastr('This is not a valid form.', 'Alert!');
    }
  }
}
