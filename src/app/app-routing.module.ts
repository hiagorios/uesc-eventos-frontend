import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  {path: 'eventos', loadChildren: () => import('./modules/evento/evento.module').then(m => m.EventoModule)},
  {path: 'usuarios', loadChildren: () => import('./modules/autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)},
  {path: 'ministrantes', loadChildren: () => import('./modules/ministrante/ministrante.module').then(m => m.MinistranteModule)},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
