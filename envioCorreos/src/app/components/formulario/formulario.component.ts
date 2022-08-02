import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  datos:FormGroup

  constructor(private htppclient:HttpClient) { 
    this.datos= new FormGroup({
      correo:new FormControl('godinezrosendo.agustin@gmail.com', [Validators.required,Validators.email]),
      asunto:new FormControl('', [Validators.required]),
      mensaje:new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  envioCorreo(){
    Notiflix.Loading.standard('cargando..');
    let params={
      email:this.datos.value.correo,
      asunto:this.datos.value.asunto,
      mensaje:this.datos.value.mensaje
    }
    console.log(params);
    
    this.htppclient.post('http://localhost:3000/envio', params).subscribe(resp=>{
      console.log(resp);
      Notiflix.Loading.remove();
    })
  }

}
