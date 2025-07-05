import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-home',
  imports: [NavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title: string = '';

  constructor(private shared: SharedService) {}

  ngOnInit(): void {
    this.title = this.shared.title;
  }
}
