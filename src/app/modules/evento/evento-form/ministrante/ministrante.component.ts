import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { MinistranteService } from 'src/app/services/ministrante.service';

@Component({
  selector: 'app-ministrante',
  templateUrl: './ministrante.component.html',
  styleUrls: ['./ministrante.component.scss']
})
export class MinistranteComponent implements OnInit {
  ministranteForm: FormGroup;
  durationInSeconds = 5;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<MinistranteComponent>, 
    private service: MinistranteService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    dialogRef.disableClose = false;
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  salvar(): void {
    if (this.ministranteForm.valid){
      console.log(this.ministranteForm.value);
      this.service.create(this.ministranteForm.value).subscribe(ministrante => {
        console.log('Ministrante criado:');
        console.log(ministrante);
        this.router.navigate(['..']);
      });
    } else {
      this.openSnackBar();
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

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
