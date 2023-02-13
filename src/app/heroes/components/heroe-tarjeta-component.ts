import { Component, Input } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta-component',
  templateUrl: './heroe-tarjeta-component.html',
  styles: [
    `
    mat-card{
      margin-top: 20px;
    }
    
    img{
      margin-left: 10%;
      width: 60%;
      max-height: 35%;
      border-radius: 5px;
    }
    
    
    `
  ]
})
export class HeroeTarjetaComponent {
  @Input() heroe!: Heroe;
}
