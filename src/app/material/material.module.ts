import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material'
import { materialize } from 'rxjs/operators';
import {ScrollingModule}from'@angular/cdk/scrolling'
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatTableModule,
  Material.MatDialogModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatIconModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTabsModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    ScrollingModule,
	  Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatCheckboxModule,
Material.MatTreeModule


  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatTableModule,
  Material.MatDialogModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatIconModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTabsModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    ScrollingModule,
	  Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatCheckboxModule,
Material.MatTreeModule
  ]
})
export class MaterialModule { }
