import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  SwalAlerts
} from 'src/app/shared';
import { LoginService, AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
   
  ) {
    
  }

  ngOnInit(): void {
    
  }

}
