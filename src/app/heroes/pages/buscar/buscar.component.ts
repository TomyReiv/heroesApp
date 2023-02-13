import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent {

  termino:string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService){}

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim()).subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    const heroe: Heroe = event.option.value;

    if(event.option.value == ''){
      this.termino = 'No se ha encontrado ningún héroe';
      this.heroeSeleccionado = undefined
    }else{
      this.termino = heroe.superhero!; 
      this.heroesService.getHereoesId(heroe.id!).subscribe(heroe => this.heroeSeleccionado = heroe);
    }
     
  }
}

