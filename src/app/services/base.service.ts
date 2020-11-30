import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entity } from '../model/entity';

export abstract class BaseService<ListDTO extends Entity, CreateDTO, UpdateDTO extends Entity> {

  constructor(public http: HttpClient, public endpoint: string) { }

  findById(id: number): Observable<ListDTO> {
    return this.http.get<ListDTO>(
      this.createUrl([this.endpoint, id.toString()])
    );
  }

  findAll(): Observable<ListDTO[]> {
    return this.http.get<ListDTO[]>(
      this.createUrl([this.endpoint])
    );
  }

  create(entity: CreateDTO): Observable<ListDTO> {
    return this.http.post<ListDTO>(
      this.createUrl([this.endpoint, 'storeDto']),
      entity
    );
  }

  update(entity: UpdateDTO): Observable<ListDTO> {
    return this.http.put<ListDTO>(
      this.createUrl([this.endpoint, 'updateDto', entity.id.toString()]),
      entity
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.springboot.baseURL}/${this.endpoint}/${id}`
    );
  }
  protected createUrl(segments: string[], baseURL: string = environment.springboot.baseURL): string {
    return baseURL.concat('/').concat(segments.join('/'));
  }
}
