import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioDTO } from './../../../model/dto/usuario-dto';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  usuarios: UsuarioDTO[];

  constructor(
    private service: UsuarioService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  deleteUsuario(usuario: UsuarioDTO): void {
    const remove = confirm(`Delete ${usuario.nome}?`);
    if (remove) {
      this.service.delete(usuario.id).subscribe(() => {
        this.snackbar.open('Usuario deletado!');
        this.refreshList();
      }, error => {
        this.snackbar.open(error.error.message);
      });
    }
  }


  refreshList(): void {
    this.service.findAllDto().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

}
