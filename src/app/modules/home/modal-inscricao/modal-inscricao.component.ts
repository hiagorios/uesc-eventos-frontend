import { AuthService } from './../../../services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SnackbarService } from './../../../services/snackbar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { EventoListDTO } from '../../../model/dto/evento-list-dto';

@Component({
  selector: 'app-modal-inscricao',
  templateUrl: './modal-inscricao.component.html',
  styleUrls: ['./modal-inscricao.component.scss']
})
export class ModalInscricaoComponent implements OnInit {

  evento: EventoListDTO;

  constructor(
    private eventoService: EventoService,
    private auth: AuthService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<ModalInscricaoComponent>,
    @Inject(MAT_DIALOG_DATA) public eventoId: number
  ) { }

  ngOnInit(): void {
    this.eventoService.findListDto(this.eventoId).subscribe(evento => {
      this.evento = evento;
    }, error => {
      this.snackbar.open('Não foi possível encontrar o evento', 4);
    });
  }

  inscrever(): void {
    this.eventoService.realizarInscricao(this.evento.id, this.auth.getCurrentUser().id)
      .subscribe(res => {
        this.snackbar.open('Inscrição realizada!');
      }, error => {
        this.snackbar.open('Não foi possível realizar a inscrição');
      });
    this.dialogRef.close();
  }

  temVagas(): boolean {
    return this.evento.vagasRestantes > 0;
  }

  getBadgeColor(): string {
    const vintePorcento = this.evento.qtdVagas * 0.2;
    const cinquentaPorcento = this.evento.qtdVagas * 0.5;
    if (this.evento.vagasRestantes < vintePorcento) {
      return 'color-danger';
    } else if (this.evento.vagasRestantes < cinquentaPorcento) {
      return 'color-warning';
    }
    return 'color-success';
  }

}
