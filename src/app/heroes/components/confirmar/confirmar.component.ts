import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
    `
    h1{
      margin-top: 10px;
      margin-bottom: 0;
    }
    button{
      justify-content: center;
      margin: auto;
    }
    `
  ]
})
export class ConfirmarComponent implements OnInit{

constructor(private dialogRef: MatDialogRef<ConfirmarComponent>,
            @Inject(MAT_DIALOG_DATA) public data: Heroe,){}

ngOnInit(): void {
  
}

borrar(){
  this.dialogRef.close(true)
}


cerrar(){
  this.dialogRef.close()
}
}
