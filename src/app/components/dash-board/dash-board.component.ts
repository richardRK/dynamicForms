import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { MatDialogRef } from "@angular/material";
import { NotificationService } from "src/app/services/notification.service";
import { EmployeeComponent } from "../employees/employee/employee.component";
import { FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "dash-board",
  templateUrl: "./dash-board.component.html",
  styleUrls: ["./dash-board.component.css"]
})
export class DashBoardComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    // private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}
  addButtonClick() {
    (<FormArray>this.service.form.get("other")).push(
      this.service.addOtherSkillFormGroup()
    );
  }
  onDelete(index) {
    (<FormArray>this.service.form.get("other")).removeAt(index);
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
