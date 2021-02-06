import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { ConfigState, SetConfigAction } from '../../core/redux/states/config';

@Component({
  selector: 'app-cookies-consent',
  templateUrl: './cookies-consent.component.html',
  styleUrls: ['./cookies-consent.component.scss']
})
export class CookiesConsentComponent implements OnInit {

  static COOKIES_CONSENT_CONFIG = 'cookies-consent';

  consent = false;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(ConfigState.getConfigItem(CookiesConsentComponent.COOKIES_CONSENT_CONFIG)).subscribe(value => {
      this.consent = !!value;
    });
  }

  consentCookies() {
    this.store.dispatch(new SetConfigAction(CookiesConsentComponent.COOKIES_CONSENT_CONFIG, true));
  }

}
