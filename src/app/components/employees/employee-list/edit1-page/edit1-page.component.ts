import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  SimpleChanges,
  AfterViewChecked,
  OnChanges
} from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { MatDialogRef, MatTableDataSource } from "@angular/material";
import { FormArray, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TestLead, EditProd } from "src/app/shared/testlead.model";
import { Form1Component } from "../../form1/form1.component";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-edit1-page",
  templateUrl: "./edit1-page.component.html",
  styleUrls: ["./edit1-page.component.css"]
})
export class Edit1PageComponent
  implements OnInit, OnDestroy, AfterViewChecked, OnChanges {
  @Input() data: any;
  @Input() count: number;
  description: any;
  libraryCode: any;
  libraryType: any;
  libraryName: any;
  t12: any = [];
  t13: any = [];
  subscription: Subscription;

  editMessages: any[] = [];

  otherArr: any[] = [];
  arrayItems: {
    librarytype: any;
    // title: string;
  }[] = [];

  libraryType1: any[] = [];

  libraryName1: any[] = [];

  form1: FormArray[] = [];

  //demoArray:any[] =[]

  // index: any;
  // @Input() editArray: EditProd;

  // products: IProduct[] = [];
  //subscription: any;
  tLead = new TestLead();

  demoForm: FormGroup;

  constructor(
    private service: EmployeeService,
    public dialogRef: MatDialogRef<Form1Component>,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    // subscribe to home component messages
    this.subscription = this.service.getEditMsgs().subscribe(message => {
      if (message) {
        this.editMessages.push(message);
      } else {
        this.editMessages = [];
      }
    });

    this.form1 = <any>this.service.form.get("other");

    var res222 = this.service.addOtherSkillFormGroup666(this.editMessages);

    var res333 = res222.filter(
      (x): x is any =>
        x.value.libraryType !== null && x.value.libraryName != null
    );

    for (var k = 0; k < res222.length; k++) {
      this.form1.push(res333[k]);
    }

    this.form1.controls = this.form1.controls.filter(
      (x): x is any =>
        x.value.libraryType !== null && x.value.libraryName !== null
    );

    this.editMessages = [];
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };
  // var form1 = <any>this.service.form22.get("other");
  // var tst11 = this.editMessages;
  // var resEdit = tst11.filter((x): x is any => x.value !== null);
  // for (var k = 0; k < resEdit.length; k++) {
  //   this.addItem(resEdit[k]);
  // }

  get other() {
    return (<any>(
      this.service.form555.value.groups["other"].filter(
        (x): x is any => x !== null
      )
    )) as FormArray;
  }
  addItem(item) {
    var resEdit = <any>(
      this.service.form555.value.groups["other"].filter(
        (x): x is any => x !== null
      )
    );
    var rr = resEdit as FormArray;
    this.arrayItems.push(item);
    this.other.push(item);
  }
  removeItem() {
    this.arrayItems.pop();
    this.other.removeAt(this.other.length - 1);
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngAfterViewChecked() {}
  ngOnInit() {
    this.arrayItems = [];
  }

  ngOnDestroy() {
    // if(this.subscription && !this.subscription.closed)
    // this.subscription.unsubscribe();
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

  onClear() {
    this.service.form.reset();
    this.service.clearFormArray();
    this.service.initializeFormGroup();
    // this.nSrvc.success(":: Submitted successfully");
  }
  onCancel() {
    this.router.navigate(["/emp-list"]);
  }

  addButtonClick() {
    (<FormArray>this.service.form.get("other")).push(
      this.service.addOtherSkillFormGroup()
    );
  }

  onSubmit() {
    if (this.service.form.valid) {
      //this.service.sendMessage1(row);
      // if (!this.service.form.get("$key").value)
      //   this.service.insertEmployee(this.service.form.value);
      // else this.service.updateEmployee(this.service.form.value);

      // this.service.TestLead.subscribe(res=>{
      //       this.service.testLead = res;
      // })

      this.tLead.description = this.description;
      this.tLead.libraryCode = this.libraryCode;
      this.tLead.libraryName = this.libraryName;
      this.tLead.libraryType = this.libraryType;

      this.service.updateContextData(this.tLead);
      this.service.form.reset();
      this.service.clearFormArray();
      this.service.initializeFormGroup();
      // this.notificationService.success(":: Submitted successfully");
      // this.onClose();
    }
  }

  onDelete(index) {
    (<FormArray>this.service.form.get("other")).removeAt(index);
  }
}
