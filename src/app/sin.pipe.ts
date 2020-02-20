import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sin'
})
export class SinPipe implements PipeTransform {
  transform(value: number): number {
    return Math.sin(value);
  }
}
