import { PerfilDTO } from './../model/dto/perfil-dto';
import { UsuarioDTO } from './../model/dto/usuario-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { UsuarioFormDTO } from '../model/dto/usuario-form-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<UsuarioDTO, UsuarioFormDTO, UsuarioFormDTO>{

  constructor(public http: HttpClient) {
    super(http, 'usuarios');
  }

  findFormDto(id: number): Observable<UsuarioFormDTO> {
    return this.http.get<UsuarioFormDTO>(
      this.createUrl([this.endpoint, 'formDto', id.toString()])
    );
  }

  findAllDto(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(
      this.createUrl([this.endpoint, 'allDto'])
    );
  }

  findPerfisDto():Observable<PerfilDTO[]> {
    return this.http.get<PerfilDTO[]>(
      this.createUrl([this.endpoint, 'perfisDto'])
    );
  }

}
