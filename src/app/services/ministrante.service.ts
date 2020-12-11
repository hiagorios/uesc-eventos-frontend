import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ministrante } from '../model/ministrante';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MinistranteService extends BaseService<Ministrante, Ministrante, Ministrante>{

  constructor(public http: HttpClient) {
    super(http, 'ministrantes');
  }

  findFormDto(id: number): Observable<Ministrante> {
    return this.http.get<Ministrante>(
      this.createUrl([this.endpoint, 'formDto', id.toString()])
    );
  }

}
