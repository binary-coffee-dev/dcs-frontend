import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number;
  root: string;

  @Input()
  full: boolean = true;

  constructor() {}

  ngOnInit() {
    this.root = 'bc@dev:';
    this.year = new Date().getFullYear();
  }
}
