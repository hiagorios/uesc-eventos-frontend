import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MinistranteService } from 'src/app/services/ministrante.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-ministrante-form',
  templateUrl: './ministrante-form.component.html',
  styleUrls: ['./ministrante-form.component.scss']
})
export class MinistranteFormComponent implements OnInit {

  idEdicao: number;

  ministranteForm: FormGroup;
  tentouSalvar = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: MinistranteService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.idEdicao = Number(params.get('id'));
        this.service.findFormDto(Number(params.get('id'))).subscribe(ministrante => {
          this.ministranteForm.patchValue(ministrante);
        }, error => {
          this.snackbar.open('Erro ao buscar ministrante');
          this.router.navigate(['/ministrantes']);
        });
      }
    });
  }

  salvar(): void {
    this.tentouSalvar = true;
    if (this.ministranteForm.valid) {
      if (this.idEdicao) {
        this.service.update(this.ministranteForm.value).subscribe(ministrante => {
          this.snackbar.open('Ministrante atualizado!');
          this.router.navigate(['/ministrantes']);
        });
      } else {
        this.service.create(this.ministranteForm.value).subscribe(ministrante => {
          this.snackbar.open('Ministrante criado!');
          this.router.navigate(['/ministrantes']);
        });
      }
    } else {
      this.snackbar.open('Preencha os campos necessários!');
    }
  }

  inicializarForm(): void {
    this.ministranteForm = this.fb.group({
      id: undefined,
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      formacao: ['', Validators.required],
      instituicao: ''
    });
  }
}
