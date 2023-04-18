import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, TitleStrategy} from '@angular/router';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { ModificarClienteComponent } from '../modificar-cliente/modificar-cliente.component';

import { ClienteInterface } from '../interfaces/ClienteInterface';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  dataSource: any = [];
  displayedColumns: string[] = ['cedula','nombres', 'apellidos','direccion','edad','modificar']
  
  data = [{
        cedula: '0151245245',      
        nombres: 'Andrés Luis',
        apellidos: 'Carvajal Lozano',
        direccion: 'Quito, Ecuador',
        edad: 50,
        id:1
        
      },
      {
        cedula: '0954658913',      
        nombres: 'Jorge Luis',
        apellidos: 'Charco Aguirre',
        direccion: 'Guayaquil, Ecuador',
        edad: 36,
        id:2
      },
      {
        cedula: '0957962158',      
        nombres: 'Andrea Lisbeth',
        apellidos: 'Romero Haro',
        direccion: 'Guayaquil, Ecuador',
        edad: 45,
        id:3
     
      }
    ];
  
  nuevoCliente:any;
  nav: any;


  bandera:any;
  ultimoCliente:any;

  constructor(private router: Router, private dialog:MatDialog) { 
    
    this.nav = this.router.getCurrentNavigation();
    this.nuevoCliente = this.nav.extras.state;
    
    if (this.nuevoCliente != null)
      {     
        
        this.bandera=true; 
        for(let item of this.data){
            if(item.id==this.nuevoCliente.datosCliente.queryParams.id){
                  item.nombres=this.nuevoCliente.datosCliente.queryParams.nombres;
                  item.apellidos=this.nuevoCliente.datosCliente.queryParams.apellidos;
                  item.cedula=this.nuevoCliente.datosCliente.queryParams.cedula;
                  item.direccion=this.nuevoCliente.datosCliente.queryParams.direccion;
                  item.edad=this.nuevoCliente.datosCliente.queryParams.edad;
                  this.bandera=false;
              }
          }

       if(this.bandera!){
              this.ultimoCliente=this.data.length-1; //posiscion del ultimo elemento 
              this.nuevoCliente.datosCliente.queryParams.id = this.data[this.ultimoCliente].id +1 ;
              
              this.data.push(this.nuevoCliente.datosCliente.queryParams);
          }
      
      }
    
    
  };


  

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ClienteInterface>(this.data as ClienteInterface[]);
    console.log(this.data);
  }

  openDialogAgregar(){
    this.dialog.open(AgregarClienteComponent, {
      width: '50%',
    })
  }

  openDialogEdit(element:any){
      
      this.dialog.open(ModificarClienteComponent, {
      width: '50%',
      data: {cedula:element.cedula,nombres:element.nombres,apellidos:element.apellidos,direccion:element.direccion,edad:element.edad,id:element.id}
      
    })
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  



}
