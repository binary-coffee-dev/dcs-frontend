import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactComponent} from './contact/contact.component';
import {AboutComponent} from './about/about.component';
import {QuestionsComponent} from './questions/questions.component';
import {JoinComponent} from './join/join.component';
import {TecsComponent} from './tecs/tecs.component';
import {DcsCommunityComponent} from './dcs-community/dcs-community.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {DevTeamComponent} from './dev-team/dev-team.component';
import {PublishComponent} from './publish/publish.component';
import {WriteTeamComponent} from './write-team/write-team.component';


@NgModule({
  declarations: [
    ContactComponent,
    AboutComponent,
    QuestionsComponent,
    JoinComponent,
    TecsComponent,
    DcsCommunityComponent,
    FeedbackComponent,
    DevTeamComponent,
    PublishComponent,
    WriteTeamComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InfoModule {
}
