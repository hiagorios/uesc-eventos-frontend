import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MinistranteService } from 'src/app/services/ministrante.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-ministrante',
  templateUrl: './ministrante.component.html',
  styleUrls: ['./ministrante.component.scss']
})
export class MinistranteComponent implements OnInit {
  ministranteForm: FormGroup;
  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MinistranteComponent>,
    private service: MinistranteService,
    private snackbar: SnackbarService
  ) {
    dialogRef.disableClose = false;
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  salvar(): void {
    if (this.ministranteForm.valid) {
      this.service.create(this.ministranteForm.value).subscribe(ministrante => {
        this.snackbar.open('Ministrante criado!');
        this.dialogRef.close(ministrante.id);
      }, error => {
        this.snackbar.open('Erro ao criar ministrante');
      });
    } else {
      this.snackbar.open('Preencha os campos necessários!');
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  inicializarForm(): void {
    this.ministranteForm = this.fb.group({
      id: undefined,
      nome: ['', Validators.required],
      email: ['', Validators.required],
      formacao: ['', Validators.required],
      instituicao: ['', Validators.required]
    });
  }
}
