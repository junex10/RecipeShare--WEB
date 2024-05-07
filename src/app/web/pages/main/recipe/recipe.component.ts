import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  SwalAlerts,
  ENVIRONMENT,
  Constants
} from 'src/app/shared';
import { LoginService, AuthService } from 'src/app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import * as moment from 'moment';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  item: any = {};
  defaultRoute = ENVIRONMENT.storage;
  moment: any = moment;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute
  ) {

  }

  food_time = [
    {value: Constants.COOKING_TYPE_TIME.MINUTES, viewValue: 'Mins'},
    {value: Constants.COOKING_TYPE_TIME.HOURS, viewValue: 'Hrs'},
    {value: Constants.COOKING_TYPE_TIME.DAYS, viewValue: 'Days'}
  ];

  difficulty = [
    {value: Constants.DIFFICULTY.EASY, viewValue: 'Easy'},
    {value: Constants.DIFFICULTY.MEDIUM, viewValue: 'Medium'},
    {value: Constants.DIFFICULTY.HARD, viewValue: 'Hard'}
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.homeService.getRecipes({
        where: {
          id
        }
      })
      .then((data) => {
        this.item = data.recipes[0];
      })
    });
  }

  getDifficulty = (difficulty: number) => (this.difficulty.filter((val) => difficulty === val.value))[0]?.viewValue;

  getPrepationTime = (prep_time: string) => (this.food_time.filter(val => Number(prep_time) === val.value))[0]?.viewValue;

}
