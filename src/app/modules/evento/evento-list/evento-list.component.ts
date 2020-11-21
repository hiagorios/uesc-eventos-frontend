import { Component, OnInit } from '@angular/core';
import { EventoDTO } from '../../../model/dto/evento-dto';
import { EventoService } from './../../../services/evento.service';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.scss']
})
export class EventoListComponent implements OnInit {

  eventos: EventoDTO[];

  constructor(
    private service: EventoService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  deleteEvento(evento: EventoDTO): void {
    const remove = confirm(`Delete ${evento.nome}?`);
    if (remove) {
      this.service.delete(evento.id).subscribe(() => {
        console.log('Evento deleted!');
        this.refreshList();
      }, error => {
        alert('Could not delete Evento');
      });
    }
  }


  refreshList(): void {
    this.service.findAll().subscribe(eventos => {
      this.eventos = eventos;
    });
  }
}
