import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { DatePickerIntl } from 'src/app/utils/DatePickerIntl';
import { HomeComponent } from './home.component';
import { ModalInscricaoComponent } from './modal-inscricao/modal-inscricao.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: { hasPermission: 'INSCREVER_SE' }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [HomeComponent, ModalInscricaoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: OwlDateTimeIntl, useClass: DatePickerIntl }
  ]
})
export class HomeModule { }
