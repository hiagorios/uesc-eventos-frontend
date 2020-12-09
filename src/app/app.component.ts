import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uesc-eventos';

  constructor(
    private authService: AuthService
  ){ }

  logout(): void {
    this.authService.logout();
  }
}
