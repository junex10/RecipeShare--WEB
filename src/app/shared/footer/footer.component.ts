import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserDTO } from 'src/app/dtos';
import { AuthService } from 'src/app/services';
import { ENVIRONMENT, MENU } from 'src/app/shared';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  showMenu: boolean = false;
  user: GetUserDTO | any = '';

  menu: any = [];

  constructor(
    private route: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser()?.user;
    this.user.photo = this.user.photo !== null ? `${ENVIRONMENT.storage}${this.user.photo}` : 'assets/img/user.png';
    const menu = MENU.find(item => item.LEVEL === this.user.level.id);
    this.menu = menu?.MENU;
  }

  openMenu = () => this.showMenu = this.showMenu ? false : true;

  redirect = (route: string) => this.route.navigate([route]);

  action = (action: any) => eval(`this.${action}`);

  logout = () => this.auth.logout();
}
