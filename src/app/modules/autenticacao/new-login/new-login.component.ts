import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class NewLoginComponent implements OnInit {

  idEdicao: number;

  userForm: FormGroup;
  durationInSeconds = 5;
  tentouSalvar = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: UsuarioService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.idEdicao = Number(params.get('id'));
        this.service.findFormDto(Number(params.get('id'))).subscribe(usuario => {
          this.userForm.patchValue(usuario);
        });
      }
    });
  }

  salvar(): void {
    this.tentouSalvar = true;
    if (this.userForm.valid) {
      if (this.idEdicao) {
        this.service.update(this.userForm.value).subscribe(Usuario => {
          this.snackbar.open('Usuário atualizado!');
          this.router.navigate(['..']);
        });
      } else if (this.confirmaSenha()) {
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
