import { NgModule } from '@angular/core';
import * as Material from "@angular/material";




@NgModule({
  declarations: [],
  imports: [
    Material.MatGridListModule, // for grid column
    Material.MatInputModule, //input
    Material.MatRadioModule, //mat-radio-group - radio button
    Material.MatDatepickerModule, //matDatepicker - datepicker
    Material.MatNativeDateModule, //required for datepicker
    Material.MatSelectModule, //mat-select - dropdown
    Material.MatCheckboxModule, //mat-checkbox - checkbox
    Material.MatButtonModule, // for button
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatSortModule,
    Material.MatPaginatorModule,
    Material.MatFormFieldModule,
    Material.MatRippleModule,
    Material.MatDialogModule,
    Material.MatSnackBarModule,
    Material.MatToolbarModule
],
exports: [
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatButtonModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatSortModule,
    Material.MatPaginatorModule,
    Material.MatFormFieldModule,
    Material.MatRippleModule,
    Material.MatDialogModule,
    Material.MatSnackBarModule,
    Material.MatToolbarModule
]
})
export class MaterialModule { }
