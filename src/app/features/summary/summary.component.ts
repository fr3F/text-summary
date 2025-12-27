import { Component, signal, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements AfterViewInit {

  text = signal('');
  summary = signal('');

  private nlp: any = null;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit() {
    if (!this.isBrowser) return;

    const winkNLP = (await import('wink-nlp')).default;
    const model = (await import('wink-eng-lite-web-model')).default;
    this.nlp = winkNLP(model);

    const { default: Lenis } = await import('@studio-freight/lenis');

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => t,
      lerp: 0.1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  summarize() {
    if (!this.nlp) return;

    const content = this.text().trim();
    if (!content) {
      this.summary.set('');
      return;
    }

    const doc = this.nlp.readDoc(content);
    const sentences = doc.sentences().out();

    const scored = sentences.map((sentence: string, index: number) => ({
      sentence,
      score: sentence.length + (sentences.length - index) * 10,
    }));

    const result = scored
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3)
      .map((s: any) => s.sentence)
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
