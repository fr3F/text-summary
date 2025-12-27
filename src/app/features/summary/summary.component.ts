import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
import Lenis from '@studio-freight/lenis';
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  text = signal('');
  summary = signal('');

  private nlp = winkNLP(model);
  ngAfterViewInit() {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => t,
      lerp: 0.1,
    });

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  summarize() {
    const content = this.text().trim();
    if (!content) {
      this.summary.set('');
      return;
    }

    const doc = this.nlp.readDoc(content);

    const sentences = doc.sentences().out();

    // score simple & rapide
    const scored = sentences.map((sentence, index) => ({
      sentence,
      score: sentence.length + (sentences.length - index) * 10,
    }));

    // top 3 phrases
    const result = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(s => s.sentence)
      .join(' ');

    this.summary.set(result);
  }

  clear() {
    this.text.set('');
    this.summary.set('');
  }
  onInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.text.set(value);
  }
}
