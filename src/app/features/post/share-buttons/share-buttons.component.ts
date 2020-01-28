import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements OnInit {

  url: string;
  urlFacebook: string;
  urlTwitter: string;


  constructor() { }

  ngOnInit() {
    this.url = document.location.href;
    this.urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${this.url}`;
    this.urlTwitter = `https://twitter.com/intent/tweet/?url=${this.url}&hastags=BinaryCoffee`;
  }

}
