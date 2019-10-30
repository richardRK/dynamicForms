import { Injectable } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { of, Subject, BehaviorSubject } from "rxjs";
import * as _ from "lodash";
import { TestLead } from "../shared/testlead.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  empList: any;
  reList: any = [];
  public testLead: Array<TestLead> = [];
  row1: any;

  lstNew: any = [];
  form1: any = [];

  lst233: any = [];

  editArray: any = [];
  list1: { libraryType: any; libraryName: any; status: any }[] = [];

  employeeList: any;

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
    libraryCode: new FormControl(null, []),
    libraryName: new FormControl(null, []),
    libraryType: new FormControl(null, []),
    status: new FormControl(null, []),
    description: new FormControl(null, []),
    other: this.formBuilder.array([this.addOtherSkillFormGroup()])
  });

  subject = new BehaviorSubject<any>([]);
  userData = this.subject.asObservable();
  subject1 = new BehaviorSubject<any>([]);
  userData1 = this.subject.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private firebase: AngularFireDatabase
  ) {}

  updateUserData(data) {
    this.subject1.next(data);
  }

  sendMessage1(row) {
    // this.row1 = row;
    this.subject1.next({ text: row });
  }

  sendMessage(description, libraryCode, libraryType, libraryName) {
    this.subject.next({
      description: description,
      libraryCode: libraryCode,
      libraryType: libraryType,
      libraryName: libraryName
    });
  }
  clearMessages() {
    // this.subject.next();
  }

  getMessages1() {
    // return this.firestore.collection("employees").snapshotChanges();
    this.employeeList = this.firestore.collection("employees");

    return this.employeeList.snapshotChanges();
  }

  getFilteredData() {
    this.employeeList = this.firestore.collection("filteredData");
    return this.employeeList.snapshotChanges();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  public setContextData(message) {
    var str1 = message.libraryType;
    var str2 = message.libraryName;
    if (str1 != undefined && str2 != undefined && !str2.includes("-")) {
      var str3 = str1.concat("-" + str2);
      message.libraryName = str3;
    }
    this.testLead.push(message);
  }

  public updateContextData(tLead) {
    // var rw1 = this.row1;
    let updateItem = this.testLead.find(this.findIndexToUpdate, tLead);
    let index = this.testLead.indexOf(updateItem);
    this.testLead[index] = tLead;
    //  var newRecordToUpdate = this.row1;
  }

  findIndexToUpdate(rw1) {
    return rw1.id === this;
  }

  public get TestLead(): Observable<TestLead[]> {
    return of(this.testLead);
  }

  addOtherSkillFormGroup(): any {
    //this.clearFormData();
    var res = this.formBuilder.group({
      libraryType: new FormControl(null, []),
      libraryName: new FormControl(null, []),
      status: new FormControl(null, [])
    });
    return res;
  }

  addOtherSkillFormGroup666(t12, t13): any {
    //this.clearFormData();

    for (var k = 0; k < t12.length; k++) {
      var res = this.formBuilder.group({
        libraryType: new FormControl(t12[k]),
        libraryName: new FormControl(t13[k]),
        status: new FormControl(null, [])
      });

      this.lst233.push(res);
    }


   
    return this.lst233;
  }

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

  deleteEmployee(id: string) {
    // this.employeeList.remove($key);
    this.firestore.doc("filteredData/" + id).delete();
  }
  populateForm(data) {
    var libCode = data.libraryCode;
    var libName = data.libraryName;

    var array = libCode.split(",");

    var status1 = "Active";

    var resEdit1 = this.addOtherSkillFormGroup2(array, libName, status1);

    this.form.patchValue({
      libraryCode: data.libraryCode,
      libraryName: data.libraryName,
      libraryType: data.libraryType,
      status: "",
      description: "",
      other: [this.editArray]
    });

    return resEdit1;
  }

  addOtherSkillFormGroup2(arry, libName, status): any {
    const formControlFields = [
      { name: "libraryType", control: new FormControl(null, []) },
      { name: "libraryName", control: new FormControl(null, []) },
      { name: "status", control: new FormControl(null, []) }
    ];
    var resp = this.addOtherSkillFormGroup1(arry, libName, status);

    const formGroup: FormGroup = new FormGroup(resp);
    formControlFields.forEach(f => formGroup.addControl(f.name, f.control));
    var resultFormGrp = new FormGroup({ other: formGroup });

    var ot1 = resultFormGrp.value.other;

    var resultArray = Object.keys(ot1).map(function(personNamedIndex) {
      let person = ot1[personNamedIndex];
      return person;
    });

    var resEdit = resultArray.filter((x): x is any => x !== null);

    return resEdit;
  }

  addOtherSkillFormGroup1(form1, libName, status): any {
    const len = form1.length;
    if (len > 0) {
      for (let i = 0; i <= len - 1; i++) {
        var res = this.formBuilder.group({
          libraryType: form1[i],
          libraryName: libName,
          status: status
        });
        this.lstNew.push(res);
      }
    }

    return this.lstNew;
  }
  clearFormArray() {
    const formArr = <FormArray>this.form.controls["other"];
    const len = formArr.length;
    if (len > 0) {
      for (let i = len - 1; i >= 1; i--) {
        formArr.removeAt(i);
      }
    }
  }

  initializeFormGroup() {
    this.form.setValue({
      libraryCode: "",
      libraryName: "",
      libraryType: "",
      status: "",
      description: "",
      other: [{ libraryType: "", libraryName: "", status: "" }]
    });
  }
}
