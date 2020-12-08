import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthorityDirective } from './authority.directive';



@NgModule({
  declarations: [
    AuthorityDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthorityDirective
  ]
})
export class DirectivesModule { }
