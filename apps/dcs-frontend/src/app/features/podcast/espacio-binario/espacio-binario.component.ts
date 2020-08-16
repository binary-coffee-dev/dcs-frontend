import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-espacio-binario',
  templateUrl: './espacio-binario.component.html',
  styleUrls: ['./espacio-binario.component.scss']
})
export class EspacioBinarioComponent implements OnInit {

  podcasts = [
    { name: 'Episodio 02', duration: '10m', date: '1 day ago', imgUrl:'', link:'' },
    { name: 'Episodio 01', duration: '17m', date: '5 days ago', imgUrl:'', link:'' },
    { name: 'Episodio 00', duration: '13m', date: '10 days ago', imgUrl:'', link:'' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
