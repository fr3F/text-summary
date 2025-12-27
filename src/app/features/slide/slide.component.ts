import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [FormsModule, SummaryComponent, CommonModule],
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent {

}
