import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PerfilDTO } from './../../../model/dto/perfil-dto';
@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class NewLoginComponent implements OnInit {

  idEdicao: number;
  perfis: PerfilDTO[];

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
        this.service.findPerfisDto().subscribe(res => {
          this.perfis = res;
        })
        this.service.findFormDto(Number(params.get('id'))).subscribe(usuario => {
          // adicionando a escolha de perfil quando for edição
          this.userForm.addControl('perfilId', new FormControl(undefined, [Validators.required]));
          this.idEdicao = Number(params.get('id'));
          // resentando os campos de senha pra não serem obrigatórios quando for edição
          this.userForm.setControl('senha', new FormControl(['']));
          this.userForm.setControl('confirmaSenha', new FormControl(['']));

          this.userForm.patchValue(usuario);
        }, error => {
          this.snackbar.open('Erro ao buscar usuário');
          this.router.navigate(['/usuarios']);
        });
      }
    });
  }

  salvar(): void {
    this.tentouSalvar = true;
    if (this.userForm.valid) {
      if (this.idEdicao) {
        this.service.update(this.userForm.value).subscribe(evento => {
          this.snackbar.open('Usuário atualizado!');
          this.router.navigate(['/usuarios']);
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
