import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoDTO } from 'src/app/model/dto/evento-dto';
import { EventoFormDTO } from 'src/app/model/dto/evento-form-dto';
import { MinistranteDTO } from 'src/app/model/dto/ministrante-dto';
import { EventoService } from 'src/app/services/evento.service';
import { MinistranteComponent } from './ministrante/ministrante.component';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.scss']
})
export class EventoFormComponent implements OnInit {
  
  evento: EventoFormDTO;
  eventos: EventoDTO[];
  ministrantes: MinistranteDTO[];
  ministrantesEscohidos: number[];

  constructor(public dialog: MatDialog, private service: EventoService) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MinistranteComponent, {
      disableClose: true,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  createEvento(evento: EventoFormDTO): void{
    this.service.create(evento).subscribe(() => {
      console.log('Evento created!');
    }, error => {
      alert('Could not create this Evento');
    });
  }
  chooseMinistrante(ministranteId: number): void{
    this.ministrantesEscohidos.push(ministranteId)
  }
  
}
