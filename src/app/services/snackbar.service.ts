import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, durationInSeconds?: number): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: durationInSeconds ? durationInSeconds * 1000 : 3000,
      verticalPosition: 'top',
      data: message
    });
  }
}
