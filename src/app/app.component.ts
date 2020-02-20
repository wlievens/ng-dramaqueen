import {Component} from '@angular/core';

@Component({
  selector: 'dq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  testNumeric: number = 10;
  testColor: string = '#e894a6';
  time = 0;
  selectedX: number;
  selectedZ: number;
  eight = [0, 1, 2, 3, 4, 5, 6, 7];

  private start: number;

  constructor() {
    this.start = new Date().getTime();
    setInterval(() => this.time = new Date().getTime() - this.start, 10);
  }

  onSelect(x: number, z: number) {
    this.selectedX = x;
    this.selectedZ = z;
  }
}
