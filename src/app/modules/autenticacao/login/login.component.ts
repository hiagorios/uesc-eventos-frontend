import { Router } from '@angular/router';
import { SnackbarService } from './../../../services/snackbar.service';
import { AuthService } from './../../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        this.snackbar.open('Logado com sucesso');
        this.router.navigate(['/home']);
      }, error => {
        this.snackbar.open(error.error.message);
      });
    } else {
      this.snackbar.open('Preencha os campos necessários!');
    }
  }
}

