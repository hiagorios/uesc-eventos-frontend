import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoListDTO } from '../../model/dto/evento-list-dto';
import { EventoService } from './../../services/evento.service';
import { ModalInscricaoComponent } from './modal-inscricao/modal-inscricao.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventos: EventoListDTO[] = [];
  public selectedDate = new Date();

  constructor(
    private eventoService: EventoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.eventoService.findAllAvailable().subscribe(eventos => {
      this.eventos = eventos;
    });
  }

  openModalInscricao(evento: EventoListDTO): void {
    const dialogRef = this.dialog.open(ModalInscricaoComponent, {
      maxWidth: '900px',
      maxHeight: '90vh',
      data: evento.id,
      panelClass: 'dialog-no-padding'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  dateToString(date: Date) {
    let hours, minutes, seconds;

    (date.getHours() <= 9) ? hours = `0${date.getHours()}` : hours = `${date.getHours()}`;
    (date.getMinutes() <= 9) ? minutes = `0${date.getMinutes()}` : minutes = `${date.getMinutes()}`;
    (date.getSeconds() <= 9) ? seconds = `0${date.getSeconds()}` : seconds = `${date.getSeconds()}`;

    return `${date.getDate()}-${(date.getMonth())+1}-${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
  }

  findEvents(event: Event): void {
    this.eventoService.findAllAvailableByDate(this.dateToString(this.selectedDate)).subscribe(eventos => {
      this.eventos = eventos;
    });
  }

}
