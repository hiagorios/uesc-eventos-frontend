import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() progress;
  file: File | null = null;

  @Output() fileChanged = new EventEmitter();

  constructor() {
  }

  readFile(event: FileList): void {
    const file = event && event.item(0);
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageString = reader.result;
        this.fileChanged.emit(imageString);
      };
    }
  }

  removeFile(): void {
    this.file = null;
    this.fileChanged.emit(null);
  }
}
