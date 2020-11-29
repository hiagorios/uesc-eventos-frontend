import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { LoginComponent } from './login/login.component';
import { NewLoginComponent } from './new-login/new-login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'new', component: NewLoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [LoginComponent, NewLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})
export class AutenticacaoModule { }
