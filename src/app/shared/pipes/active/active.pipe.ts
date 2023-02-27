import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {

  transform(value: boolean): string {
    switch (value) {
      case true: return 'check';
      case false: return 'close';
    }
    return 'close';
  }

}
