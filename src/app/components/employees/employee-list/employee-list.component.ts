import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
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
import { Router } from '@angular/router';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  listData: MatTableDataSource<any>;
  searchKey: any;
  public displayResult = false;

  displayedColumns: string[] = ["libraryCode", "libraryName", "actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private service: EmployeeService,
    private dialog: MatDialog,
    private nSrvc: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.form.reset();
    this.service.clearFormArray();
  }

  ngAfterViewInit() {}


  getEmp() {
    this.service.getData().subscribe(list => {
      this.listData = new MatTableDataSource<any>(list);
      this.displayResult = true;
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  clearSearchField() {}


  //change 2
  onCreate() {
    this.service.clearFormArray();
    this.service.initializeFormGroup();
    this.router.navigate(['/create-page']);
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

  onCancel(){
    this.router.navigate(['/emp-list']);
  }
  //change 1
  onEdit(row) {
    this.service.populateForm(row);
    this.router.navigate(['/edit-page']);

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // this.dialog.open(Form1Component, dialogConfig);
  }

  onDelete($key) {
    if (confirm("Are you sure to delete this record ?")) {
      //this.service.deleteEmployee($key);
      //  this.notificationService.warn('! Deleted successfully');
    }
  }
}
