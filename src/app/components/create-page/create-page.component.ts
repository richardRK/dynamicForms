import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialogRef } from '@angular/material';
import { Form1Component } from '../employees/form1/form1.component';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  constructor(
    private service: EmployeeService,
    public dialogRef: MatDialogRef<Form1Component>
  ) {}

  ngOnInit() {
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    // this.nSrvc.success(":: Submitted successfully");
  }
}
