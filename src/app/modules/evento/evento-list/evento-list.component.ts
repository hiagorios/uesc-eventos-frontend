import { SnackbarService } from 'src/app/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { EventoListDTO } from '../../../model/dto/evento-list-dto';
import { EventoService } from './../../../services/evento.service';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.scss']
})
export class EventoListComponent implements OnInit {

  eventos: EventoListDTO[];

  constructor(
    private service: EventoService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  deleteEvento(evento: EventoListDTO): void {
    const remove = confirm(`Deletar ${evento.nome} e seus sub-eventos?`);
    if (remove) {
      this.service.delete(evento.id).subscribe(() => {
        this.snackbar.open('Evento deletado!');
        this.refreshList();
      }, error => {
        this.snackbar.open(error.error.message);
      });
    }
  }


  refreshList(): void {
    this.service.findAll().subscribe(eventos => {
      this.eventos = eventos;
    });
  }
}
