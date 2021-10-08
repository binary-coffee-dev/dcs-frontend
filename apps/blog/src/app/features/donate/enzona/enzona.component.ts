import { Component } from '@angular/core';

@Component({
  selector: 'app-enzona',
  templateUrl: './enzona.component.html',
  styleUrls: ['./enzona.component.scss', '../donate-panel.component.scss']
})
export class EnzonaComponent {

  copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    alert(`Id de la cuenta copiado: ${val}`);
  }
}
