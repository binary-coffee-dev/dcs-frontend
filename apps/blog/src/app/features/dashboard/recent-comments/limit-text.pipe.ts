import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText'
})
export class LimitTextPipe implements PipeTransform {

  transform(text: string, size: number): string {
    const len = Math.min(text && text.length || 0, size);
    return (text || '').substr(0, len);
  }
}
