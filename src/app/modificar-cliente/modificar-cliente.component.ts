import {Component, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router, TitleStrategy } from '@angular/router';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.css']
})
export class ModificarClienteComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {cedula: string,nombres:string,apellidos:string,direccion:string,edad:string,id:number},private router: Router, private dialogRef: MatDialogRef<ModificarClienteComponent>) { 
   
  }


  ngOnInit(): void {
  
  }
  //navigationExtras: NavigationExtras={};

  usuarioedit = new FormGroup({
    cedula: new FormControl('',Validators.required),
    nombres: new FormControl('',Validators.required),
    apellidos: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    id: new FormControl('')
  })




  onSubmit()
  { 
    let objToSend: NavigationExtras = {
      queryParams: {
       cedula: this.usuarioedit.value.cedula,
        nombres: this.usuarioedit.value.nombres,
        apellidos: this.usuarioedit.value.apellidos,
        direccion: this.usuarioedit.value.direccion,
        edad: this.usuarioedit.value.edad,
        id: this.usuarioedit.value.id
      },
      skipLocationChange: false,
      fragment: 'top' 
    };

    this.dialogRef.close(); 
    this.redirectTo('/cliente', objToSend);
  }

  redirectTo(uri:string, objToSend:NavigationExtras){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri],{ state: { datosCliente: objToSend}}));
  }

  cancelar()
  {
    this.dialogRef.close(); 
  }



  
}
