import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../../post/post.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  body: any

  ngOnInit() {
    this.body = `
      # Binary Coffee

      Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Doloremque veniam possimus impedit. Id perferendis iste
      consequuntur iusto consectetur rerum soluta nostrum tenetur laboriosam quia,
      sapiente, aut voluptates, non accusantium ratione!
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Doloremque veniam possimus impedit. Id perferendis iste
      consequuntur iusto consectetur rerum soluta nostrum tenetur laboriosam quia,
      sapiente, aut voluptates, non accusantium ratione!
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Doloremque veniam possimus impedit. Id perferendis iste
      consequuntur iusto consectetur rerum soluta nostrum tenetur laboriosam quia,
      sapiente, aut voluptates, non accusantium ratione!
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Doloremque veniam possimus impedit. Id perferendis iste
      consequuntur iusto consectetur rerum soluta nostrum tenetur laboriosam quia,
      sapiente, aut voluptates, non accusantium ratione!

      # DC's Community

      Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Doloremque veniam possimus impedit. Id perferendis iste
      consequuntur iusto consectetur rerum soluta nostrum tenetur laboriosam quia,
      sapiente, aut voluptates, non accusantium ratione!
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Doloremque veniam possimus impedit. Id perferendis iste
      consequuntur iusto consectetur rerum soluta nostrum tenetur laboriosam quia,
      sapiente, aut voluptates, non accusantium ratione!
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Doloremque veniam possimus impedit. Id perferendis iste
      consequuntur iusto consectetur rerum soluta nostrum tenetur laboriosam quia,
      sapiente, aut voluptates, non accusantium ratione!
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Doloremque veniam possimus impedit. Id perferendis iste
      consequuntur iusto consectetur rerum soluta nostrum tenetur laboriosam quia,
      sapiente, aut voluptates, non accusantium ratione!

    `;
  }

}
