import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoDTO } from '../model/dto/evento-dto';
import { EventoFormDTO } from '../model/dto/evento-form-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService extends BaseService<EventoDTO, EventoFormDTO, EventoFormDTO>{

  constructor(public http: HttpClient) {
    super(http, 'eventos');
  }

  findAllAvailable(): Observable<EventoDTO[]> {
    return this.http.get<EventoDTO[]>(
      this.createUrl([this.endpoint, 'available'])
    );
  }

  findFormDto(id: number): Observable<EventoFormDTO> {
    return this.http.get<EventoFormDTO>(
      this.createUrl([this.endpoint, 'formDto', id.toString()])
    );
  }

  findAllDto(excludeId?: number): Observable<EventoDTO[]> {
    let params = new HttpParams();
    if (excludeId) {
      params = params.append('excludeId', excludeId.toString());
    }
    return this.http.get<EventoDTO[]>(
      this.createUrl([this.endpoint, 'allDto']), { params }
    );
  }
}
