import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import QRCode from 'qrcode';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent {
  text: string = '';
  darkColor: string = '#000000';
  lightColor: string = '#ffffff';
  qrWidth: number = 200;
  history: string[] = [];

  ngAfterViewInit() {
    this.generateQR();
  }

  generateQR() {
    if (!this.text) return;

    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    QRCode.toCanvas(
      canvas,
      this.text,
      {
        width: this.qrWidth,
        color: {
          dark: this.darkColor,
          light: this.lightColor
        }
      },
      (error) => {
        if (error) console.error(error);
      }
    );
  }


  downloadQR() {
    const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qrcode.png';
      link.click();
    }
  }
}
