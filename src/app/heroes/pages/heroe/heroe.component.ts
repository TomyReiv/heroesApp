import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img{
      margin-left: 10%;
      width: 60%;
      max-height: 500px;
      border-radius: 5px;
    }
    
    `
  ]
})
export class HeroeComponent implements OnInit{



  constructor (private ActivatedRoute: ActivatedRoute,
              private HeroesService: HeroesService,
              private router: Router){}

  heroe!: Heroe;

  ngOnInit(): void {
    this.ActivatedRoute.params
    .pipe(switchMap(({id}) => this.HeroesService.getHereoesId(id)))
    .subscribe(heroe => this.heroe = heroe)
  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
  }
}
