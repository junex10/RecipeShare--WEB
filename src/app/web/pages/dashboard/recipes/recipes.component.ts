import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { RecipeService, AuthService } from 'src/app/services';
import Swal from 'sweetalert2';
import {
  Constants,
  SwalAlerts,
  ENVIRONMENT
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
  defaultPic: string = 'assets/img/bg-img/bg4.jpg';
  user: any;
  recipes: any[] = [];

  form: FormGroup;
  routeMealPic: string = ENVIRONMENT.storage;

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
  openUpdateModal = false;
  
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
    this.getRecipes(this.auth.getUser()?.user?.id)
  }

  openRecipes = () => this.openEditModal = true;
  openUpdateRecipes = () => this.openUpdateModal = true;
  closeUpdateModal = () => {
    this.openUpdateModal = false;
    this.itemSelected = {};
  }

  newRecipe = () => {
    if (this.form.invalid) {
      this.formError();
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
        this.form.reset();
        this.getRecipes(this.user.id)
      });
    }
  }
  updateRecipe = () => {
    if (this.form.invalid) {
      this.formError();
      return;
    } else {
      this.recipe.updateRecipe({
        ...this.form.value,
        user_id: this.user.id,
        id: this.itemSelected.id,
        formData: true
      })
      .then(() => {
        Swal.fire(SwalAlerts.swalSuccess('Recipe', 'Recipe updated'));
        this.openEditModal = false;
        this.itemSelected = {};
        this.form.reset();
        this.getRecipes(this.user.id)
      });
    }
  }

  formError = () => {
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
  }

  activeItem = (item: any) => {
    this.openUpdateModal = true;
    this.itemSelected = item;

    this.form.setValue({
      name: item?.name,
      cooking_time: item.cooking_time,
      cooking_time_type: item.cooking_time_type,
      description: item.description,
      preparation_time: item.prep_time,
      preparation_time_type: item.prep_time_type,
      difficulty_field: item.difficulty,
      photo: item?.photo ?? this.defaultPic
    });
  }

  removeItem = () => {
    console.log(this.itemSelected.id)
    Swal.fire(SwalAlerts.swalAuthAction('Are you sure that you want to remove this meal?'))
    .then(ans => {
      if (ans.isConfirmed) {
        this.recipe.removeRecipe({ id: this.itemSelected.id })
          .then(() => {
            Swal.fire(SwalAlerts.swalSuccess('', 'Meal removed successfully')).then(() => {
              this.form.reset();
              this.itemSelected = {};
              this.getRecipes(this.user.id);
            });
          })
      } else {
        this.form.reset();
        this.getRecipes(this.user.id);
      }
    })
    
  }

  getRecipes = (user_id: any) => {
    this.recipe.getRecipe({ user_id })
      .then(data => this.recipes = data.recipes)
  }

  onImage = (file: any) => {
    /*if (Object.entries(this.itemSelected).length > 0) {
      this.itemSelected = {};
    }*/
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
