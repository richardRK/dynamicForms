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
import { FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TestLead, EditProd } from "src/app/shared/testlead.model";
import { Form1Component } from "../../form1/form1.component";

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
  // index: any;
  // @Input() editArray: EditProd;

  // products: IProduct[] = [];
  subscription: any;
  tLead = new TestLead();

  constructor(
    private service: EmployeeService,
    public dialogRef: MatDialogRef<Form1Component>,
    private router: Router
  ) {
    //this.service.clearFormArray();
    // var form1 = <any>this.service.form.get("other");
    // var tst11 = this.libraryCode;
    // if (tst11 != undefined) {
    //   var tt22 = tst11.split(",");
    //   for (var j = 0; j < tt22.length; j++) {
    //     var r233 = tt22[j].split("-");
    //     if (r233[0] != null && r233[1] != null) {
    //       this.t12.push(r233[0]);
    //       this.t13.push(r233[1]);
    //     }
    //   }
    //   var res222 = this.service.addOtherSkillFormGroup666(this.t12, this.t13);
    //   for (var k = 0; k < res222.length; k++) {
    //     form1.push(res222[k]);
    //   }
    // }
  }

  t12: any = [];
  t13: any = [];

  ngOnChanges(changes: SimpleChanges) {
  
  }

  ngAfterViewChecked() {
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
    // if(this.subscription && !this.subscription.closed)
    // this.subscription.unsubscribe();
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
