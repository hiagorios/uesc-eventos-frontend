import { DirectivesModule } from './../../directives/directives.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { DatePickerIntl } from 'src/app/utils/DatePickerIntl';
import { ComponentsModule } from './../../components/components.module';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { MinistranteComponent } from './evento-form/ministrante/ministrante.component';
import { EventoListComponent } from './evento-list/evento-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventoListComponent,
    canActivate: [AuthGuardService],
    data: { hasPermission: 'CONSULTAR_EVENTO' }
  },
  {
    path: 'new',
    component: EventoFormComponent,
    canActivate: [AuthGuardService],
    data: { hasPermission: 'CRIAR_EVENTO' }
  },
  {
    path: 'edit/:id',
    component: EventoFormComponent,
    canActivate: [AuthGuardService],
    data: { hasPermission: 'EDITAR_EVENTO' }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [EventoListComponent, EventoFormComponent, MinistranteComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    DirectivesModule,
    DigitOnlyModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: OwlDateTimeIntl, useClass: DatePickerIntl }
  ]
})
export class EventoModule { }
