import {Component} from '@angular/core';

@Component({
  selector: 'dq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  testNumeric: number = 0;
  testColor: string = '#e894a6';
  time = 0;

  private start: number;

  constructor() {
    this.start = new Date().getTime();
    setInterval(() => this.time = new Date().getTime() - this.start, 10);
  }
}
