import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../../post/post.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  body: any;

  ngOnInit() {
    this.body = '';
  }

}
