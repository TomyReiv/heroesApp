import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .conteiner{
      margin: 10px;
    }`
  ]
})
export class HomeComponent {

  /*   auth!: Auth; */

  get auth(){
    return this.authService.auth;
  }

  constructor(private router:Router,
              private authService: AuthService){}

  logout(){
    this.router.navigate(['./auth']);
  }
}
