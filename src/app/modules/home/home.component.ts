import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoDTO } from './../../model/dto/evento-dto';
import { EventoService } from './../../services/evento.service';
import { ModalInscricaoComponent } from './modal-inscricao/modal-inscricao.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventos: EventoDTO[] = [];

  constructor(
    private eventoService: EventoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.eventoService.findAllAvailable().subscribe(eventos => {
      this.eventos = eventos;
    });
  }

  openModalInscricao(evento: EventoDTO): void {
    const dialogRef = this.dialog.open(ModalInscricaoComponent, {
      maxWidth: '900px',
      maxHeight: '90vh',
      data: evento,
      panelClass: 'dialog-no-padding'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
