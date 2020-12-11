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
  public selectedData = new Date();

  constructor(
    private eventoService: EventoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.eventoService.findAllAvailableByDate(this.selectedData.toLocaleString('br').replace(/\//g, '-')).subscribe(eventos => {
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

  findEvents(event: Event): void {
    this.eventoService.findAllAvailableByDate(this.selectedData.toLocaleString('br').replace(/\//g, '-')).subscribe(eventos => {
      this.eventos = eventos;
    });
  }

}
