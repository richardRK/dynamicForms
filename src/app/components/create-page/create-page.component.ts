import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { MatDialogRef } from "@angular/material";
import { Form1Component } from "../employees/form1/form1.component";
import { EmployeeComponent } from "../employees/employee/employee.component";
import { FormBuilder, FormArray } from "@angular/forms";
import { NotificationService } from "src/app/services/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-page",
  templateUrl: "./create-page.component.html",
  styleUrls: ["./create-page.component.css"]
})
export class CreatePageComponent implements OnInit {
  description: any;
  libraryCode: any;
  libraryType: any;
  libraryName: any;
  constructor(
    private service: EmployeeService,
    // private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {


    
  }

  addButtonClick() {
    (<FormArray>this.service.form.get("other")).push(
      this.service.addOtherSkillFormGroup()
    );
  }
  onDelete(index) {
    (<FormArray>this.service.form.get("other")).removeAt(index);
  }
  onCancel() {
    this.router.navigate(["/emp-list"]);
  }
  onClear() {
    this.service.form.reset();
    this.service.clearFormArray();
    this.service.initializeFormGroup();
    // this.nSrvc.success(":: Submitted successfully");
  }
  onSubmit() {
    if (this.service.form.valid) {
      // if (!this.service.form.get("$key").value)
      //   this.service.insertEmployee(this.service.form.value);
      // else this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      // this.notificationService.success(":: Submitted successfully");
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
