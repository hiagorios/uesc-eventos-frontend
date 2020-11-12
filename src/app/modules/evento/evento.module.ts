import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoListComponent } from './evento-list/evento-list.component';
import { CreateEventoComponent } from './create-evento/create-evento.component';
import { UpdateEventoComponent } from './update-evento/update-evento.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MinistranteComponent } from './create-evento/ministrante/ministrante.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {path: '', component: EventoListComponent},
  {path: 'new', component: CreateEventoComponent},
  {path: 'edit/:id', component: UpdateEventoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [EventoListComponent, CreateEventoComponent, UpdateEventoComponent, MinistranteComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    RouterModule
  ]
})
export class EventoModule { }
