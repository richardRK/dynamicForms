import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  MatTableDataSource,
  MatPaginator,
  MatDialogConfig,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { MatSort } from "@angular/material/sort";
import { Form1Component } from "../form1/form1.component";
import { NotificationService } from "src/app/services/notification.service";
import { Router } from "@angular/router";
import { Subscription, Observable, of } from "rxjs";
import {
  TestLead,
  Employee,
  Employee1,
  Test,
  EditProd
} from "src/app/shared/testlead.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  listData: MatTableDataSource<any>;
  // searchKey: any;
  public displayResult = false;
  public displayFormatData = false;
  eList: any = [];
  empList: Array<{ libraryType: string; libraryName: any }> = [];
  private testLead: Array<TestLead> = [];
  subscription: any;
  displayedColumns: string[] = ["libraryCode", "libraryName", "actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  list: Employee1[] = [];
  list1: { libraryName: any; libraryCode: any }[] = [];
  results: { libraryName: any; libraryCode: any }[] = [];
  list4: { libraryName: any; libraryCode: any }[] = [];

  // list2: new Employee2();
  list2 = new Employee1();

  list3 = new Employee1();

  interval: any;

  editArray$: any[] = [];

  constructor(
    private service: EmployeeService,
    private dialog: MatDialog,
    private nSrvc: NotificationService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.service.form.reset();
    this.service.clearFormArray();

    // this.refreshData();
    // this.interval = setInterval(() => {
    //   this.refreshData();
    // }, 5000);
  }

  refreshData() {
    this.service.getData().subscribe(data => {
      this.list = data;
    });
    this.service.getFilteredData().subscribe(data => {
      this.results = data;
    });
  }

  ngAfterViewInit() {}

  formatData(lst) {
    var len = lst.length;
    for (let i = 0; i <= len - 1; i++) {
      var item = lst[i];
      var otr = item.other;
      var len1 = otr.length;

      for (let j = 0; j <= len1 - 1; j++) {
        var libName = item.other[j].libraryName;
        var libCode =
          item.other[j].libraryType + "-" + item.other[j].libraryName;
        this.list1.push({
          libraryName: libName,
          libraryCode: libCode
        });
      }

      var res11 = this.list1;
      var resultString = ""; // result variable

      for (var m = 0; m < res11.length; m++)
        resultString += res11[m].libraryCode + ",";

      resultString = resultString.replace(/,(?=[^,]*$)/, "");

      this.list3.libraryCode = resultString;

      for (var k = 0; k < res11.length; k++) {
        if (res11[k].libraryName === "") continue;
        else this.list3.libraryName = res11[k].libraryName;
      }

      let id = this.firestore.createId();
      let data = Object.assign({}, this.list3);
      this.firestore
        .collection("filteredData")
        .doc(id)
        .set(Object.assign({}, data));

      resultString = "";
      this.list1 = [];
    }

    // var res = this.results;
  }

  getEmp() {
    // subscribe to home component messages

    //get Main Details

    if (!this.displayResult) {
      this.service.getMessages1().subscribe(actionArray => {
        this.list = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Employee;
        });
      });

      if (this.list.length > 0 && !this.displayFormatData) {
        this.formatData(this.list);
        this.displayFormatData = true;
      }

      //get from the firebase
      this.service.getFilteredData().subscribe(actionArray => {
        //format the data and push to firebase
        this.results = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Employee1;
        });
      });

      this.listData = new MatTableDataSource<any>(this.results);
      if (this.results.length > 0) {
        this.displayResult = true;
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  public doFilter = (value: string) => {
    this.listData.filter = value.trim().toLocaleLowerCase();
  };

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // if this.subscription has direct object
    //  if(this.subscription && !this.subscription.closed)
    //  this.subscription.unsubscribe();
  }

  clearSearchField() {}

  //change 2
  onCreate() {
    this.service.clearFormArray();
    this.service.initializeFormGroup();
    this.router.navigate(["/create-page"]);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // this.dialog.open(Form1Component, dialogConfig);
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    // this.nSrvc.success(":: Submitted successfully");
  }

  onCancel() {
    this.router.navigate(["/emp-list"]);
  }
  //change 1
  onEdit(row) {
   this.service.populateForm(row);


    //this.service.sendMessage1(row);
    this.router.navigate(["edit1-page"]);
    // this.router.navigate(['/emp-list/edit2-page']);

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // this.dialog.open(Form1Component, dialogConfig);
  }

  onDelete(row) {
    if (confirm("Are you sure to delete this record ?")) {
      this.service.deleteEmployee(row);
      //  this.notificationService.warn('! Deleted successfully');
    }
  }
}
