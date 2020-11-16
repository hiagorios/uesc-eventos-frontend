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
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend tincidunt arcu, et cursus risus fermentum eu. Donec non eros diam. Aenean vulputate leo et ante aliquam, semper tempor dui interdum. Vivamus mollis, augue non vestibulum efficitur, leo odio porta metus, ut tincidunt enim velit id massa. Vestibulum et nulla libero. Sed et suscipit nibh. Donec dignissim interdum eros non egestas. Nullam hendrerit turpis nec turpis congue porttitor. Curabitur velit ex, efficitur at semper et, laoreet a urna. Suspendisse sit amet dapibus purus. Fusce a blandit magna, ac interdum ex. Maecenas viverra quis ante vitae lobortis. Cras sed libero eu justo consequat sollicitudin viverra id nisi.',
        idOrganizador: 2,
        local: 'Auditório Pav. Jorge Amado',
        nome: 'Palestra Animais Exóticos',
        preco: 0,
        qtdVagas: 100,
        idEventoPai: null
      },
      {
        id: 2,
        dataInicio: date,
        dataFim: date,
        dataInicioInscricao: date,
        dataFimInscricao: date,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend tincidunt arcu, et cursus risus fermentum eu. Donec non eros diam. Aenean vulputate leo et ante aliquam, semper tempor dui interdum. Vivamus mollis, augue non vestibulum efficitur, leo odio porta metus, ut tincidunt enim velit id massa. Vestibulum et nulla libero. Sed et suscipit nibh. Donec dignissim interdum eros non egestas. Nullam hendrerit turpis nec turpis congue porttitor. Curabitur velit ex, efficitur at semper et, laoreet a urna. Suspendisse sit amet dapibus purus. Fusce a blandit magna, ac interdum ex. Maecenas viverra quis ante vitae lobortis. Cras sed libero eu justo consequat sollicitudin viverra id nisi.',
        idOrganizador: 2,
        local: 'Pav. de Ciências Exatas e Tecnológicas',
        nome: 'Campeonato de CS',
        preco: 0,
        qtdVagas: 20,
        idEventoPai: null
      },
      {
        id: 2,
        dataInicio: date,
        dataFim: date,
        dataInicioInscricao: date,
        dataFimInscricao: date,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend tincidunt arcu, et cursus risus fermentum eu. Donec non eros diam. Aenean vulputate leo et ante aliquam, semper tempor dui interdum. Vivamus mollis, augue non vestibulum efficitur, leo odio porta metus, ut tincidunt enim velit id massa. Vestibulum et nulla libero. Sed et suscipit nibh. Donec dignissim interdum eros non egestas. Nullam hendrerit turpis nec turpis congue porttitor. Curabitur velit ex, efficitur at semper et, laoreet a urna. Suspendisse sit amet dapibus purus. Fusce a blandit magna, ac interdum ex. Maecenas viverra quis ante vitae lobortis. Cras sed libero eu justo consequat sollicitudin viverra id nisi.',
        idOrganizador: 2,
        local: 'Céu',
        nome: 'Campeonato de Pebolim',
        preco: 0,
        qtdVagas: 20,
        idEventoPai: null
      },
      {
        id: 2,
        dataInicio: date,
        dataFim: date,
        dataInicioInscricao: date,
        dataFimInscricao: date,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend tincidunt arcu, et cursus risus fermentum eu. Donec non eros diam. Aenean vulputate leo et ante aliquam, semper tempor dui interdum. Vivamus mollis, augue non vestibulum efficitur, leo odio porta metus, ut tincidunt enim velit id massa. Vestibulum et nulla libero. Sed et suscipit nibh. Donec dignissim interdum eros non egestas. Nullam hendrerit turpis nec turpis congue porttitor. Curabitur velit ex, efficitur at semper et, laoreet a urna. Suspendisse sit amet dapibus purus. Fusce a blandit magna, ac interdum ex. Maecenas viverra quis ante vitae lobortis. Cras sed libero eu justo consequat sollicitudin viverra id nisi.',
        idOrganizador: 2,
        local: 'Pav. Max de Menezes',
        nome: 'Debate de eleições do DCE',
        preco: 0,
        qtdVagas: 20,
        idEventoPai: null
      }
    ];
  }

}
