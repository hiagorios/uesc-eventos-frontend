import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/model/evento';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.scss']
})
export class EventoListComponent implements OnInit {

  eventos: Evento[];

  constructor(
    private service: EventoService
  ) { }

  ngOnInit(): void {
    const date = new Date();
    this.eventos = [
    {
      id: 1,
      dataInicio: date,
      dataFim: date,
      dataInicioInscricao: date,
      dataFimInscricao: date,
      descricao: 'Bla',
      idOrganizador: 2,
      local: 'Ceu',
      nome: 'Palestrinha',
      preco: 0,
      qtdVagas: 4,
      idEventoPai: null
    }
  ];
  }

}
