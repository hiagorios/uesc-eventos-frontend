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
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    this.eventos = this.eventoService.findAllAvailable();
  }

}
