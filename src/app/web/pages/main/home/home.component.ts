import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  SwalAlerts,
  ENVIRONMENT
} from 'src/app/shared';
import { LoginService, AuthService } from 'src/app/services';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logo: string = 'assets/img/logo.png';

  lastRecipe: any = {};
  recipes: any = [];
  defaultRoute = ENVIRONMENT.storage;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private homeService: HomeService
  ) {
    
  }

  ngOnInit(): void {
    this.getRecipes({ order: [['id', 'desc']] })
  }

  getRecipes = (parameters: any) => {
    this.homeService.getRecipes(parameters)
    .then((data) => {
      this.lastRecipe = {
        image: ENVIRONMENT.storage + data?.recipes[0]?.photo,
        title: data?.recipes[0]?.name,
        description: data?.recipes[0]?.description
      }

      this.recipes = data.recipes;
    })
  }

  setMainPic = () => {
    const style = {
      'background-image': `url(${this.lastRecipe?.image})`
    };
    return style
  }
  
}
