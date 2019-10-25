import { Component, OnInit, Input } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { MatDialogRef } from "@angular/material";
import { Form1Component } from "../employees/form1/form1.component";
import { FormArray } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.css"]
})
export class EditPageComponent implements OnInit {
  @Input() data: any;
  @Input() count: number;
  constructor(
    private service: EmployeeService,
    public dialogRef: MatDialogRef<Form1Component>,
    private router: Router
  ) {}

  ngOnInit() {}
  
  onClear() {
    this.service.form.reset();
    this.service.clearFormArray();
    this.service.initializeFormGroup();
    // this.nSrvc.success(":: Submitted successfully");
  }
  onCancel(){
    this.router.navigate(['/emp-list']);
  }

  addButtonClick() {
    (<FormArray>this.service.form.get("other")).push(
      this.service.addOtherSkillFormGroup()
    );
  }

  onDelete(index) {
    (<FormArray>this.service.form.get("other")).removeAt(index);
  }
}
