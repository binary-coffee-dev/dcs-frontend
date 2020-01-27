import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { QuestionsComponent } from './questions/questions.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { JoinComponent } from './join/join.component';
import { TecsComponent } from './tecs/tecs.component';
import { DcsCommunityComponent } from './dcs-community/dcs-community.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { DevTeamComponent } from './dev-team/dev-team.component';



@NgModule({
  declarations: [ContactComponent, AboutComponent, QuestionsComponent, SiteMapComponent, JoinComponent, TecsComponent, DcsCommunityComponent, FeedbackComponent, DevTeamComponent],
  imports: [
    CommonModule
  ]
})
export class InfoModule { }
