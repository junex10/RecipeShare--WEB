import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserDTO } from 'src/app/dtos';
import { AuthService } from 'src/app/services';
import { ENVIRONMENT, MENU } from 'src/app/shared';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.css']
})
export class SidebarComponent implements OnInit {

  @Input('profile') profile: boolean = false;
  @Input('recipes') recipes: boolean = false;

  constructor(
    private route: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
   
  }
}
