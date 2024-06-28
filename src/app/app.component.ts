import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Color-Overloader';

  constructor(private meta: Meta) {
    this.meta.addTag({ property: 'og:title', content: 'Color Overloader' });
    this.meta.addTag({ property: 'og:description', content: `Renschi's Color Overloader` });
    this.meta.addTag({ property: 'og:url', content: 'https://rmifka.github.io/Color-Overloader/' });
    this.meta.addTag({ property: 'og:image', content: 'https://avatars.githubusercontent.com/u/73305789?v=4' });
    this.meta.addTag({ name: 'theme-color', content: '#43B581', 'data-react-helmet': 'true' });
  }
}
