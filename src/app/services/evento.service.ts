import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoFormDTO } from '../model/dto/evento-form-dto';
import { EventoListDTO } from '../model/dto/evento-list-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService extends BaseService<EventoListDTO, EventoFormDTO, EventoFormDTO>{

  constructor(public http: HttpClient) {
    super(http, 'eventos');
  }

  findAllAvailable(): Observable<EventoListDTO[]> {
    return this.http.get<EventoListDTO[]>(
      this.createUrl([this.endpoint, 'available'])
    );
  }

  findFormDto(id: number): Observable<EventoFormDTO> {
    return this.http.get<EventoFormDTO>(
      this.createUrl([this.endpoint, 'formDto', id.toString()])
    );
  }

  findDetailDto(id: number): Observable<EventoListDTO> {
    return this.http.get<EventoListDTO>(
      this.createUrl([this.endpoint, 'detailDto', id.toString()])
    );
  }

  findAllDto(excludeId?: number): Observable<EventoListDTO[]> {
    let params = new HttpParams();
    if (excludeId) {
      params = params.append('excludeId', excludeId.toString());
    }
    return this.http.get<EventoListDTO[]>(
      this.createUrl([this.endpoint, 'allDto']), { params }
    );
  }
}
