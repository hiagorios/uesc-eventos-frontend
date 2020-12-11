import { DirectivesModule } from './directives/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { HttpInterceptorProvider } from './interceptors/MyHttpInterceptor';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    DirectivesModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pt-BR' },
    AuthInterceptorProvider,
    HttpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
