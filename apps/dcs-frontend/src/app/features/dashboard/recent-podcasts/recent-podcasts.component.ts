import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-podcasts',
  templateUrl: './recent-podcasts.component.html',
  styleUrls: ['./recent-podcasts.component.scss']
})
export class RecentPodcastsComponent implements OnInit {

  podcasts = [
    { name: 'Episodio 00', duration: '10m', date: '1 day ago' },
    { name: 'Episodio 01', duration: '17m', date: '5 days ago' },
    { name: 'Episodio 02', duration: '13m', date: '10 days ago' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
