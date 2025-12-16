import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrcodeComponent } from './store/qrCode/qrcode.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QrcodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kotrana';
}
