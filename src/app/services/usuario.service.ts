import { UsuarioDTO } from './../model/dto/usuario-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario, Usuario, Usuario>{

  private usuarioAutenticado: UsuarioDTO = {
    id: 1,
    nome: 'Hiago',
    email: 'hrcordeiro.cic@uesc.br'
  };

  constructor(public http: HttpClient) {
    super(http, 'usuarios');
  }

  getUsuarioAutenticado(): UsuarioDTO {
    return this.usuarioAutenticado;
  }
  findFormDto(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(
      this.createUrl([this.endpoint, 'formDto', id.toString()])
    );
  }


}
