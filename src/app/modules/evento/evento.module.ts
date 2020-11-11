import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventoComponent } from './create-evento/create-evento.component';
import { EventoListComponent } from './evento-list/evento-list.component';
import { UpdateEventoComponent } from './update-evento/update-evento.component';

const routes: Routes = [
  { path: '', component: EventoListComponent },
  { path: 'new', component: CreateEventoComponent },
  { path: 'edit/:id', component: UpdateEventoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [EventoListComponent, CreateEventoComponent, UpdateEventoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EventoModule { }
