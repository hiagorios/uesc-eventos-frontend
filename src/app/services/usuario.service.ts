import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario, Usuario, Usuario>{

  constructor(public http: HttpClient) {
    super(http, 'usuarios');
  }

}
