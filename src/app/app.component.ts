import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private shared: SharedService) {
    this.shared.title = 'angular-hello-world';
  }
}
