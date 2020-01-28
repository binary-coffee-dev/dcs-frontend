import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-buttoms',
  templateUrl: './share-buttoms.component.html',
  styleUrls: ['./share-buttoms.component.css']
})
export class ShareButtomsComponent implements OnInit {

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
