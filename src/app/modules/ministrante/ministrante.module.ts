import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MinistranteFormComponent } from './ministrante-form/ministrante-form.component';
import { MinistranteListComponent } from './ministrante-list/ministrante-list.component';

const routes: Routes = [
  {
    path: '',
    component: MinistranteListComponent,
    canActivate: [AuthGuardService],
    data: { hasPermission: 'CONSULTAR_MINISTRANTE' }
  },
  {
    path: 'new',
    component: MinistranteFormComponent,
    canActivate: [AuthGuardService],
    data: { hasPermission: 'CRIAR_MINISTRANTE' }
  },
  {
    path: 'edit/:id',
    component: MinistranteFormComponent,
    canActivate: [AuthGuardService],
    data: { hasPermission: 'EDITAR_MINISTRANTE' }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [MinistranteListComponent, MinistranteFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    DirectivesModule
  ],
  exports: [
    RouterModule
  ]
})
export class MinistranteModule { }
