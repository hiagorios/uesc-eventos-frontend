import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ministrante',
  templateUrl: './ministrante.component.html',
  styleUrls: ['./ministrante.component.scss']
})
export class MinistranteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MinistranteComponent>) {
    dialogRef.disableClose = false;
  }

  ngOnInit(): void {
  }
  cancel(): void {
    this.dialogRef.close();
  }

}
