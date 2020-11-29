import { SnackbarService } from 'src/app/services/snackbar.service';
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
    private service: EventoService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  deleteEvento(evento: EventoDTO): void {
    const remove = confirm(`Delete ${evento.nome}?`);
    if (remove) {
      this.service.delete(evento.id).subscribe(() => {
        this.snackbar.open('Evento deletado!');
        this.refreshList();
      }, error => {
        this.snackbar.open('Não foi possível deletar o Evento');
      });
    }
  }


  refreshList(): void {
    this.service.findAll().subscribe(eventos => {
      this.eventos = eventos;
    });
  }
}
