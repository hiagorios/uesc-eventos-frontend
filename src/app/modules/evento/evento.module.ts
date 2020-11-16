import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePickerIntl } from 'src/app/utils/DatePickerIntl';
import { CreateEventoComponent } from './create-evento/create-evento.component';
import { MinistranteComponent } from './create-evento/ministrante/ministrante.component';
import { EventoListComponent } from './evento-list/evento-list.component';
import { UpdateEventoComponent } from './update-evento/update-evento.component';

const routes: Routes = [
  { path: '', component: EventoListComponent },
  { path: 'new', component: CreateEventoComponent },
  { path: 'edit/:id', component: UpdateEventoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [EventoListComponent, CreateEventoComponent, UpdateEventoComponent, MinistranteComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: OwlDateTimeIntl, useClass: DatePickerIntl }
  ]
})
export class EventoModule { }
