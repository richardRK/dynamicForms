import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";
import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  constructor() {}

  empList: any;

  departments = [
    { id: 1, value: "Dep 1" },
    { id: 2, value: "Dep 2" },
    { id: 3, value: "Dep 3" }
  ];

  status = [
    { id: 1, value: "All" },
    { id: 2, value: "Active" },
    { id: 3, value: "Inactive" }
  ];

  librarytype = [
    { id: 1, value: "Category" },
    { id: 2, value: "Address Type" },
    { id: 3, value: "AGM" },
    { id: 4, value: "Air" },
    { id: 5, value: "Aviation" },
    { id: 6, value: "BackOffice" },
    { id: 7, value: "Package" },
    { id: 8, value: "VisaType" }
  ];

  form: FormGroup = new FormGroup({
    libraryCode: new FormControl(""),
    libraryName: new FormControl(""),
    libraryType: new FormControl(""),
    status: new FormControl(""),
    description: new FormControl("")
   
  });

  getData(): Observable<any> {
    this.empList = [
      {
        libraryCode: "L1",
        libraryName: "Hanis Yahman"
      },
      {
        libraryCode: "L2",
        libraryName: "Economy Class E"
      },
      {
        libraryCode: "L3",
        libraryName: "Demob"
      },
      {
        libraryCode: "L4",
        libraryName: "Business Class"
      },
      {
        libraryCode: "L5",
        libraryName: "Jennifer Tongohan"
      },
      {
        libraryCode: "L6",
        libraryName: "First Class"
      },
      {
        libraryCode: "L7",
        libraryName: "H-Stack"
      }
    ];

    return of(this.empList);
  }
  populateForm(data) {
    // this.form.setValue(_.omit(employee,""));
    this.form.setValue({
      libraryCode: data.libraryCode,
      libraryName: data.libraryName,
      libraryType: "",
      status: "",
      description: ""
    });
  }


  
  initializeFormGroup() {
    this.form.setValue({
      libraryCode: "",
      libraryName: "",
      libraryType: "",
      status: "",
      description: ""
    });
  }
}
