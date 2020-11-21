import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoDTO } from './../../../model/dto/evento-dto';

@Component({
  selector: 'app-modal-inscricao',
  templateUrl: './modal-inscricao.component.html',
  styleUrls: ['./modal-inscricao.component.scss']
})
export class ModalInscricaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalInscricaoComponent>,
    @Inject(MAT_DIALOG_DATA) public evento: EventoDTO
  ) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close();
  }

}
