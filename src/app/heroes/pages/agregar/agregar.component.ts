import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    .green{
      background-color: green;
      margin-right: 5px;
    }
    button{
      margin-top: 10px;
    }
    img{
      width: 100%;
      max-height: 60%;
      align-items: center;
    }
    `

  ]
})
export class AgregarComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, 
              private heroesService: HeroesService, 
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.ActivatedRoute.params
        .pipe(
          switchMap(({ id }) => this.heroesService.getHereoesId(id))
        )
        .subscribe(heroe => this.heroe = heroe);
    }
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  guardar() {

    if (this.heroe.superhero?.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => this.mostrarSnackBar('Registro actualizado'))
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro creado');
      })
    }
  }
  regresar() {
    this.router.navigate(['/heroes/listado'])
  }
  borrar(){

   const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      height: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe((result)=>{
      if(result){

         this.heroesService.eliminarHeroe(this.heroe.id!).subscribe(resp => {
      this.router.navigate(['/heroes']);
        }); 
        
      }
    })

   
  }

  mostrarSnackBar(mensaje: string){
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    })
  }
}
