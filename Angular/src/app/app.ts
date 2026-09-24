import { Component, signal } from '@angular/core';
import { Dashboard } from '../projetos/components/dashboard/dashboard';

@Component({
  imports: [ Dashboard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Angular');
}
