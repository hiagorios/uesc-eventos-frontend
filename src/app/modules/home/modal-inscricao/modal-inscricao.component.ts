import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoListDTO } from '../../../model/dto/evento-list-dto';

@Component({
  selector: 'app-modal-inscricao',
  templateUrl: './modal-inscricao.component.html',
  styleUrls: ['./modal-inscricao.component.scss']
})
export class ModalInscricaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalInscricaoComponent>,
    @Inject(MAT_DIALOG_DATA) public evento: EventoListDTO
  ) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close();
  }

}
