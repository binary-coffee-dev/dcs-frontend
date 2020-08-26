import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  top5Post = [
    {name: 'binary-coffee', posts: 50},
    {name: 'binary-coffee2', posts: 35},
    {name: 'binary-coffee5', posts: 20},
    {name: 'binary-coffee6', posts: 15},
    {name: 'binary-coffee8', posts: 5},
  ];

  top5Likes = [
    {name: 'binary-coffee4', posts: 500},
    {name: 'binary-coffee8', posts: 350},
    {name: 'binary-coffee', posts: 200},
    {name: 'binary-coffee6', posts: 150},
    {name: 'binary-coffee2', posts: 50},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  filterUser() {

  }

  getUserAvatar() {
    return 'assets/images/noavatar.png';
  }

}
