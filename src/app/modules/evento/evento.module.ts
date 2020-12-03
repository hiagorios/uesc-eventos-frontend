import { PipesModule } from './../../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePickerIntl } from 'src/app/utils/DatePickerIntl';
import { ComponentsModule } from './../../components/components.module';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { MinistranteComponent } from './evento-form/ministrante/ministrante.component';
import { EventoListComponent } from './evento-list/evento-list.component';

const routes: Routes = [
  { path: '', component: EventoListComponent },
  { path: 'new', component: EventoFormComponent },
  { path: 'edit/:id', component: EventoFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
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
    PipesModule,
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
