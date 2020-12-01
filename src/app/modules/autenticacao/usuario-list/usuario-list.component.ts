import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[];

  constructor(
    private service: UsuarioService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  deleteUsuario(usuario: Usuario): void {
    const remove = confirm(`Delete ${usuario.nome}?`);
    if (remove) {
      this.service.delete(usuario.id).subscribe(() => {
        this.snackbar.open('Usuario deletado!');
        this.refreshList();
      }, error => {
        this.snackbar.open('Não foi possível deletar o Usuario');
      });
    }
  }


  refreshList(): void {
    this.service.findAll().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

}
