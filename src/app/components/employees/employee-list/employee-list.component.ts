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
import { FirebaseApp } from "@angular/fire";

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
  // subscription: any;
  displayedColumns: string[] = ["libraryCode", "libraryName", "actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  libraryCode: string;
  libraryName: string;
  libraryType: string;
  employeeList: any;
  list: Employee1[] = [];
  list1: { libraryName: any; libraryCode: any }[] = [];
  results: { libraryName: any; libraryCode: any }[] = [];
  list4: { libraryName: any; libraryCode: any }[] = [];

  // list2: new Employee2();
  list2 = new Employee1();

  list3 = new Employee1();

  empid: any;

  interval: any;
  filteredData: boolean = false;

  editArray$: any[] = [];
  subscription: Subscription;

  constructor(
    private service: EmployeeService,
    private dialog: MatDialog,
    private nSrvc: NotificationService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private firestore: AngularFirestore,
    private firebase: FirebaseApp
  ) {
  
  }

  ngOnInit() {
    this.service.form.reset();
    this.service.clearFormArray();
    // const collection = this.firebase.firestore().collection("filteredData");
    // collection.get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     //check if the entity exists
    //     if (
    //       this.list3.libraryCode == doc.data().libraryCode &&
    //       this.list3.libraryName == doc.data().libraryName
    //     ) {
    //       this.filteredData = true;
    //     }
    //   });
    // });
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
      this.empid = item.id;
      var otr = item.other;
      var len1 = otr.length;

      //form the - seperated values in list1
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

      //form the comma seperated list in list3
      for (var m = 0; m < res11.length; m++)
        resultString += res11[m].libraryCode + ",";
      resultString = resultString.replace(/,(?=[^,]*$)/, "");
      this.list3.libraryCode = resultString;
      for (var k = 0; k < res11.length; k++) {
        if (res11[k].libraryName === "") continue;
        else this.list3.libraryName = res11[k].libraryName;
      }

      //push the data to firestore
      //let id = this.firestore.createId();
      let data = Object.assign({}, this.list3);
      this.firestore
        .collection("filteredData")
        .doc(this.empid)
        .set(Object.assign({}, data));

      resultString = "";
      this.list1 = [];
    }
  }

  getEmp() {
    //get Main Details
    if (!this.displayResult) {
      //display the list which was created
      this.subscription = this.service.getMessages1().subscribe(actionArray => {
        this.list = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Employee;
        });
      });

      //format the data with comma seperated values
      if (this.list.length > 0) {
        this.formatData(this.list);
        //this.displayFormatData = true;
      }

      //fetch the formatted data
      this.subscription = this.service
        .getFilteredData()
        .subscribe(actionArray => {
          //format the data and push to firebase
          this.results = actionArray.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Employee1;
          });
        });

      //display in the datatable
      this.listData = new MatTableDataSource<any>(this.results);
      if (this.results.length > 0) {
        this.displayResult = true;
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return (
              ele != "actions" &&
              data[ele] != undefined &&
              data[ele].toLowerCase().indexOf(filter) != -1
            );
          });
        };
      }
    }
  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = filter;
      return this.displayedColumns.some(ele => {
        ele != "actions" &&
          data[ele] != undefined &&
          data[ele].libraryCode
            .toLowerCase()
            .indexOf(searchTerms.libraryCode) !== -1 &&
          data[ele].id
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.id) !== -1 &&
          data[ele].libraryName
            .toLowerCase()
            .indexOf(searchTerms.libraryName) !== -1;
        //&& data[ele].pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
      });
    };
    return filterFunction;
  }

  onSearchClear() {
    this.searchKey = "";
    this.libraryCode = "";
    this.libraryName = "";
    this.applyFilter();
  }

  public doFilter = (value: string) => {
    this.listData.filter = value.trim().toLocaleLowerCase();
  };

  applyFilter() {
    switch (this.searchKey || this.libraryCode || this.libraryName) {
      case this.libraryCode:
        this.listData.filter =
          this.libraryCode != undefined
            ? this.libraryCode.trim().toLowerCase()
            : "";
        break;
      case this.searchKey:
        this.listData.filter =
          this.searchKey != undefined
            ? this.searchKey.trim().toLowerCase()
            : "";
        break;
      case this.libraryName:
        this.listData.filter =
          this.libraryName != undefined
            ? this.libraryName.trim().toLowerCase()
            : "";
        break;

      // case this.libraryType:
      //   this.listData.filter =
      //     this.libraryType != undefined
      //       ? this.libraryType.trim().toLowerCase()
      //       : "";
      //   break;

      default:
        break;
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // if this.subscription has direct object
    //  if(this.subscription && !this.subscription.closed)
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
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
