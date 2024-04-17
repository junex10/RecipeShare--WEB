import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService, ProfileService } from 'src/app/services';
import Swal from 'sweetalert2';
import {
  Constants,
  SwalAlerts
} from 'src/app/shared';
import * as moment from 'moment';
import { ENVIRONMENT } from 'src/app/shared';
import { GetAssociatedDTO, User } from 'src/app/dtos';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data: any[] = [];
  user: any;
  moment: any = moment;

  form: FormGroup;

  openEditModal: boolean = false;

  itemSelected: any = {};

  userImage: string = 'assets/img/user.png';

  editUserStyle: NgbModalOptions = {
    size: 'xl'
  };

  patient: boolean = false;

  associateList = {
    data: <GetAssociatedDTO | any>[],
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private profile: ProfileService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      name: [null, Validators.required],
      lastname: [null],
      photo: [null],
      id: [null]
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load = () => {
    this.user = this.auth.getUser()?.user;
    this.user.photo = this.user.photo !== null ? `${ENVIRONMENT.storage}${this.user.photo}` : 'assets/img/user.png';
    this.patient = this.user.level.id === Constants.LEVELS.USER && true;

    this.form.get('email')?.setValue(this.user.email);
    this.form.get('name')?.setValue(this.user.person.name);
    this.form.get('lastname')?.setValue(this.user.person.lastname);
    this.form.get('id')?.setValue(this.user.id);
  
  }

  openEdit = () => this.openEditModal = true;

  submit = () => {
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
      
      this.profile.updateUser({
        ...this.form.value,
        formData: true
      })
      .then(async value => {
        Swal.fire(SwalAlerts.swalSuccess('Profile', 'Profile updated!'));
        this.auth.removeUser();
        await this.auth.setUser(value);
        this.user = this.auth.getUser()?.user;
      });
    }
  }

  onImage = (file: any) => {
    this.userImage = file.base64;
    this.form.get('photo')?.setValue(file.blob);
  }

  get email() { return this.form.get('email')?.value }
  get name() { return this.form.get('name')?.value }
  get lastname() { return this.form.get('lastname')?.value }
  get photo() { return this.form.get('photo')?.value }
}
