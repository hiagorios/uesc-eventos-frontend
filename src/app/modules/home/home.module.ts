import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ModalInscricaoComponent } from './modal-inscricao/modal-inscricao.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [HomeComponent, ModalInscricaoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
