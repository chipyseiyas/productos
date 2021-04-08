import {AfterViewInit, Component, ViewChild,Injectable} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl,Validators } from '@angular/forms';

import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit
{ 
  title = 'Personas';

  displayedColumns: string[] = ['Nombre', 'Edad', 'Sexo', 'Documento'];
  
  dataSource = new MatTableDataSource<Personas>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  name = new FormControl('',Validators.required);
  file = new FormControl('',Validators.required);

  constructor( private localStorageService: LocalStorageService) {}

  ngAfterViewInit()
  {
    
    let per = this.localStorageService.get('personas');
    
    if(per.length > 0)
    {
      var datas = [];           
      for(var k in per)
      {        
        datas.push(per[k]); 
      }

      this.dataSource.data = datas;
    }
    this.dataSource.paginator = this.paginator;
  }

  onSubmit()
  { 
    if(this.name.valid)
    {
      console.log(this.file.value);


     /* var datas = this.dataSource.data;
      datas.push({
        nombre : this.name.value,
        edad: 0,
        sexo : '',
        documento: ''       
      });
      this.dataSource.data = datas;

      this.localStorageService.set('personas',datas);

      this.name.setValue('');*/
    }
  }
}

export interface Personas {
nombre: string;
edad: number;
sexo: string;
documento: string;
}

const ELEMENT_DATA: Personas[] = [
{ nombre: 'John Smith', edad: 26, sexo: 'Hombre',documento : ''},
{ nombre: 'Jone Doe', edad: 38, sexo: 'Mujer',documento : ''},
{ nombre: 'Robert Smith', edad: 62, sexo: 'Hombre',documento : ''},
{ nombre: 'Patty Smith', edad: 28, sexo: 'Mujer',documento : ''}
];