import { ModalInscricaoComponent } from './modal-inscricao/modal-inscricao.component';
import { MatDialog } from '@angular/material/dialog';
import { EventoService } from './../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/model/evento';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(
    private eventoService: EventoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const date = new Date();
    this.eventos = [{
      id: 1,
      dataInicio: date,
      dataFim: date,
      dataInicioInscricao: date,
      dataFimInscricao: date,
      descricao: 'Descrição ...',
      idOrganizador: 2,
      local: 'Auditório Pav. Jorge Amado',
      nome: 'Palestra Animais Exóticos',
      preco: 0,
      qtdVagas: 4,
      idEventoPai: null
    }];
  }

  openModalInscricao(evento: Evento): void {
    const dialogRef = this.dialog.open(ModalInscricaoComponent, {
      data: evento
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
