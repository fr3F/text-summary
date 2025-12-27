import { Component } from '@angular/core';
import { TitreComponent } from './features/titre/titre.component';
import { SlideComponent } from './features/slide/slide.component';
import { FooterComponent } from './features/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TitreComponent, SlideComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kotrana';
}
