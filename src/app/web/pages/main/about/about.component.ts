import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  SwalAlerts
} from 'src/app/shared';
import { LoginService, AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  logo: string = 'assets/img/logo.png';

  core_img: string = 'assets/img/core-img/';

  visibility: string = 'password';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private route: Router,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(6)
      ]]
    })
  }

  ngOnInit(): void {
    
  }

  switchVisibility = () => this.visibility = this.visibility === 'password' ? 'text' : 'password';

  submit = () => {
    this.login.login(this.form.value).subscribe(
      (user) => {
        Swal.fire(SwalAlerts.swalSuccess('', 'Se ha iniciado la sesión')).then(() => {
          this.auth.setUser(user);
          this.route.navigate(['/dashboard/profile']);
        })
      },
      () => Swal.fire(SwalAlerts.swalError())
    )
  }

  get email() { return this.form.get('email')?.value }
  get password() { return this.form.get('password')?.value }
}
