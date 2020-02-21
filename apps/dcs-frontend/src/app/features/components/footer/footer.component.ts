import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year: number;
  root: string;

  constructor() { }

  ngOnInit() {
    this.root = 'bc@dev:';
    this.year = new Date().getFullYear();
  }
}
