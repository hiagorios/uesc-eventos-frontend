import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class NewLoginComponent implements OnInit {
  userForm: FormGroup;
  senha1: string = "";
  senha2: string = "";
  durationInSeconds = 5;

  constructor(private fb: FormBuilder,
    private router: Router,
    private service: UsuarioService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  salvar(): void {
    if (this.userForm.valid && this.confirmaSenha()){
      console.log(this.userForm.value);
      this.service.create(this.userForm.value).subscribe(usuario => {
        console.log('Usuario criado:');
        console.log(usuario);
        this.router.navigate(['..']);
      });
    } else {
      alert('Preencha os campos necessários');
    }
  }

  confirmaSenha():boolean{
    if(this.senha1 == this.senha2){
      return true
    } 
    else {
      alert('As senhas informadas não são iguais.');
      return false
    }
  }

  inicializarForm(): void {
    this.userForm = this.fb.group({
      id: undefined,
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  
}
