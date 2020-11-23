import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MinistranteDTO } from 'src/app/model/dto/ministrante-dto';
import { Ministrante } from 'src/app/model/ministrante';
import { MinistranteService } from 'src/app/services/ministrante.service';

@Component({
  selector: 'app-ministrante',
  templateUrl: './ministrante.component.html',
  styleUrls: ['./ministrante.component.scss']
})
export class MinistranteComponent implements OnInit {
  ministrantex: MinistranteDTO = {
    id :undefined,
    nome: undefined,
    email: undefined,
    formacao: undefined
  };
  id :number = 0;
  constructor(public dialogRef: MatDialogRef<MinistranteComponent>, private service: MinistranteService) {
    dialogRef.disableClose = false;
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  createMinistrante(ministrante: Ministrante): void{
    ministrante.id = this.id;
    this.service.create(ministrante).subscribe(()=>{
      console.log('Ministrante created!');
    }, error => {
      alert('Could not create Ministrante');
    });
    this.id = this.id + 1;
  }

}
