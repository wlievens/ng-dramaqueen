import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cos'
})
export class CosPipe implements PipeTransform {
  transform(value: number): number {
    return Math.cos(value);
  }
}
