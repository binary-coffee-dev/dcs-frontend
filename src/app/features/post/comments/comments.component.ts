import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

import {Store} from '@ngxs/store';

import {FetchCaptchaAction} from '../../../core/redux/actions';
import {CommentState} from '../../../core/redux/states';
import {Captcha} from '../../../core/redux/models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  captcha: Captcha;
  myCaptcha: SafeHtml;

  constructor(private store: Store, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchCaptchaAction());
    this.store.select(CommentState.captcha).subscribe(captcha => {
      this.captcha = captcha;
      if (captcha) {
        this.myCaptcha = this.sanitizer.bypassSecurityTrustHtml(captcha.captcha);
      }
    });
  }

}
