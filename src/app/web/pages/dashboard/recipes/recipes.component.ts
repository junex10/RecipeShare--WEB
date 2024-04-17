import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {

  data: any[] = [];
  header = ['#', 'name', 'Preparation time', 'difficulty', 'Meal people'];
  itemSelected: any = {};
  animal: string = '';
  name: string = '';

  constructor(
    public dialog: MatDialog
  ) {
    
  }

  ngOnInit(): void {
    
  }

}
