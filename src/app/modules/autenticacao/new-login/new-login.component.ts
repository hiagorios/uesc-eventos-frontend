import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class NewLoginComponent implements OnInit {

  userForm: FormGroup;
  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UsuarioService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  salvar(): void {
    if (this.userForm.valid) {
      if (this.confirmaSenha()) {
        this.service.create(this.userForm.value).subscribe(usuario => {
          this.snackbar.open('Usuário criado!');
          this.router.navigate(['..']);
        });
      } else {
        this.snackbar.open('As senhas informadas não são iguais.');
      }
    } else {
      this.snackbar.open('Preencha os campos necessários!');
    }
  }

  confirmaSenha(): boolean {
    return this.userForm.get('senha').value === this.userForm.get('confirmaSenha').value;
  }

  inicializarForm(): void {
    this.userForm = this.fb.group({
      id: undefined,
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      senha: ['', Validators.required],
      confirmaSenha: ['', Validators.required]
    });
  }
}
