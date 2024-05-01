import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { RecipeService, AuthService } from 'src/app/services';
import Swal from 'sweetalert2';
import {
  Constants,
  SwalAlerts
} from 'src/app/shared';

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
  recipeImage: string = 'assets/img/bg-img/bg4.jpg';
  user: any;

  form: FormGroup;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '250px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  food_time = [
    {value: Constants.COOKING_TYPE_TIME.MINUTES, viewValue: 'Minutes'},
    {value: Constants.COOKING_TYPE_TIME.HOURS, viewValue: 'Hours'},
    {value: Constants.COOKING_TYPE_TIME.DAYS, viewValue: 'Days'}
  ];

  difficulty = [
    {value: Constants.DIFFICULTY.EASY, viewValue: 'Easy'},
    {value: Constants.DIFFICULTY.MEDIUM, viewValue: 'Medium'},
    {value: Constants.DIFFICULTY.HARD, viewValue: 'Hard'}
  ];

  openEditModal: boolean = false;
  editUserStyle: NgbModalOptions = {
    size: 'xl'
  };

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private auth: AuthService,
    private recipe: RecipeService
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      cooking_time: [null],
      cooking_time_type: [null],
      description: [null],
      preparation_time: [null],
      preparation_time_type: [null],
      difficulty_field: [null],
      photo: [null]
    })
  }

  ngOnInit(): void {
    this.user = this.auth.getUser()?.user;
  }

  openRecipes = () => this.openEditModal = true;

  newRecipe = () => {
    if (this.form.invalid) {
      Swal.fire(SwalAlerts.swalCustom(
        `<div>
          <h4 class='text-center'>Invalid form</h4>
          <p style='font-size: 15px;' class='mt-4'>There's some error in the form, please check before to send</p>
        </div>`,
        {
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
          icon: 'error'
        }
      ));
      return;
    } else {
      this.recipe.newRecipe({
        ...this.form.value,
        user_id: this.user.id,
        formData: true
      })
      .then(() => {
        Swal.fire(SwalAlerts.swalSuccess('Recipe', 'Recipe created'));
        this.openEditModal = false;
      });
    }
    
  }

  onImage = (file: any) => {
    this.recipeImage = file.base64;
    this.form.get('photo')?.setValue(file.blob);
  }

  get name() { return this.form.get('name')?.value }
  get cooking_time() { return this.form.get('cooking_time')?.value }
  get cooking_time_type() { return this.form.get('cooking_time_type')?.value }
  get description() { return this.form.get('description')?.value }
  get preparation_time() { return this.form.get('preparation_time')?.value }
  get preparation_time_type() { return this.form.get('preparation_time_type')?.value }
  get difficulty_field() { return this.form.get('difficulty_field')?.value }
  get photo() { return this.form.get('photo')?.value }
}
