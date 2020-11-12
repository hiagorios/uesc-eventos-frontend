import { Evento } from './../../../model/evento';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-inscricao',
  templateUrl: './modal-inscricao.component.html',
  styleUrls: ['./modal-inscricao.component.scss']
})
export class ModalInscricaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalInscricaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evento
  ) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close();
  }

}
