import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { QuestionsComponent } from './questions/questions.component';



@NgModule({
  declarations: [ContactComponent, AboutComponent, QuestionsComponent],
  imports: [
    CommonModule
  ]
})
export class InfoModule { }
