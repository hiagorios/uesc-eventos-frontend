import { MinistranteService } from './../../../services/ministrante.service';
import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Ministrante } from 'src/app/model/ministrante';

@Component({
  selector: 'app-ministrante-list',
  templateUrl: './ministrante-list.component.html',
  styleUrls: ['./ministrante-list.component.scss']
})
export class MinistranteListComponent implements OnInit {

  ministrantes: Ministrante[];

  constructor(
    private service: MinistranteService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  deleteMinistrante(ministrante: Ministrante): void {
    const remove = confirm(`Delete ${ministrante.nome}?`);
    if (remove) {
      this.service.delete(ministrante.id).subscribe(() => {
        this.snackbar.open('Ministrante deletado!');
        this.refreshList();
      }, error => {
        this.snackbar.open('Não foi possível deletar o Ministrante ' + ministrante.nome);
      });
    }
  }


  refreshList(): void {
    this.service.findAll().subscribe(ministrantes => {
      this.ministrantes = ministrantes;
    });
  }

}
