import { DirectivesModule } from './../../directives/directives.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { NewLoginComponent } from './new-login/new-login.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioListComponent,
    canActivate: [AuthGuardService],
    data: { hasPermission: 'CONSULTAR_USUARIO' }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
    data: { isAuthenticated: false }
  },
  {
    path: 'new',
    component: NewLoginComponent,
    canActivate: [AuthGuardService],
    data: { isAuthenticated: false }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [LoginComponent, NewLoginComponent, UsuarioListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    DirectivesModule
  ],
  exports: [
    RouterModule
  ]
})
export class AutenticacaoModule { }
