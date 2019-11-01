import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { MatDialogRef } from "@angular/material";
import { Form1Component } from "../employees/form1/form1.component";
import { EmployeeComponent } from "../employees/employee/employee.component";
import { FormBuilder, FormArray, FormControl, FormGroup } from "@angular/forms";
import { NotificationService } from "src/app/services/notification.service";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

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

  index: any = 0;
  _id: any;
  static latestId: number;

  constructor(
    private service: EmployeeService,
    // private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this._id = CreatePageComponent.incrementId();
  }

  ngOnInit() {}

  // clearFormArray = (formArray: FormArray): any => {
  //   formArray = this.formBuilder.array([]);
  // };

  addButtonClick() {
    var form1 = <any>this.service.form.get("other");
    var resp = this.service.addOtherSkillFormGroup();
    form1.push(resp);
  }

  clearFormArray = (formArray: FormArray): any => {
    var len = formArray.length;
    if (len > 0) {
      for (let i = len - 1; i >= 1; i--) {
        formArray.removeAt(i);
      }
    }
    return formArray;
  };

  // clearFormData(form1) {
  //   const formArr = <FormArray>this.service.form.controls["other"];
  //   const len = formArr.length;
  //   if (len > 0) {
  //     for (let i = len - 1; i >= 1; i--) {
  //       formArr.updateOn('');
  //     }
  //   }
  // }
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

  clearMessages(): void {
    // clear messages
    // this.service.clearMessages();
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
  onSubmit() {
    if (this.service.form.valid) {
      // let resp = this.service.form.value as FormGroup;
      let data = Object.assign({}, this.service.form.value);
      //delete data.id;

      if (this.service.form.touched == true) {
        if (this.service.form.value.id == null)
          this.firestore.collection("employees").add(data);
        else
          this.firestore
            .doc("employees/" + this.service.form.value.value.id)
            .update(data);

        this.service.form.reset();
        this.service.clearFormArray();
        this.service.initializeFormGroup();
        // this.notificationService.success(":: Submitted successfully");
        this.onClose();
      }

      // this.service.sendMessage(
      //   // this._id,
      //   this.description,
      //   this.libraryCode,
      //   this.libraryType,
      //   this.libraryName
      // );
      // if (!this.service.form.get("$key").value)
      //   this.service.insertEmployee(this.service.form.value);
      // else this.service.updateEmployee(this.service.form.value);
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    // this.dialogRef.close();
  }
}
