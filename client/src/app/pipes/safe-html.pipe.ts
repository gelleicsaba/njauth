import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHTML',
  standalone:true
})
export class SafeHTMLPipe implements PipeTransform {
  constructor (private san: DomSanitizer) {
  }
  transform(value: any, ...args: any[]): any {
    return this.san.bypassSecurityTrustHtml(value);
  }
}