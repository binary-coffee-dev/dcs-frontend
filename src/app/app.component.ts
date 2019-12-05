import {Component, OnInit} from '@angular/core';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const POSTS_QUERY = gql` { posts { title body } } `;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dcs-frontend';

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({query: POSTS_QUERY})
      .valueChanges.subscribe(result => {
      console.log(result);
    });
  }

}
