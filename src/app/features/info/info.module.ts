import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { QuestionsComponent } from './questions/questions.component';
import { SiteMapComponent } from './site-map/site-map.component';



@NgModule({
  declarations: [ContactComponent, AboutComponent, QuestionsComponent, SiteMapComponent],
  imports: [
    CommonModule
  ]
})
export class InfoModule { }
