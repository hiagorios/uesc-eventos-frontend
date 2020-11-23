import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/model/dto/usuario-dto';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class NewLoginComponent implements OnInit {
  usuario : Usuario = {
    id: undefined,
    nome: undefined,
    senha: undefined,
    email: undefined,
    tipoUsuario: undefined,
    cpf: undefined
  }
  senha1: string = "";
  senha2: string = "";
  nome: string = "";
  sobrenome: string = "";
  id: number = 0;
  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
  }
  
  createUsuario(usuario: Usuario): void{
    usuario.id = this.id;
    usuario.tipoUsuario = 'P';
    usuario.cpf = '123';
    usuario.nome = this.nome.concat(" ".toString(), this.sobrenome.toString());
    if (this.senha1 == this.senha2){
      usuario.senha = this.senha1;
      this.service.create(usuario).subscribe(()=>{
        console.log('Usuario created!');
      }, error => {
        alert('Could not create Usuario.');
      });
      this.id = this.id + 1;
    }
    
  }
}
