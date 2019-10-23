import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-form1",
  templateUrl: "./form1.component.html",
  styleUrls: ["./form1.component.css"]
})
export class Form1Component implements OnInit {
  constructor(
    private service: EmployeeService,
    public dialogRef: MatDialogRef<Form1Component>
  ) {}

  ngOnInit() {}
  
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    // this.nSrvc.success(":: Submitted successfully");
  }
}
