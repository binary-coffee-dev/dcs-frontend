import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { ConfigState, SetConfigAction } from '../../core/redux/states/config';
import consentVersions from '../../../assets/consent-versions.json';

@Component({
  selector: 'app-cookies-consent',
  templateUrl: './cookies-consent.component.html',
  styleUrls: ['./cookies-consent.component.scss']
})
export class CookiesConsentComponent implements OnInit {

  static COOKIES_CONSENT_CONFIG = 'cookies-consent';

  currentConsentVersion = '';
  showConsent = false;

  constructor(private store: Store) {
    this.currentConsentVersion = Object.keys(consentVersions).sort()
      .reduce(((p, k, i) => `${p}${k}:${(consentVersions as any)[k]}/`), '');
  }

  ngOnInit(): void {
    this.store.select(ConfigState.getConfigItem(CookiesConsentComponent.COOKIES_CONSENT_CONFIG)).subscribe(value => {
      this.showConsent = value !== this.currentConsentVersion;
    });
  }

  consentCookies() {
    this.store.dispatch(new SetConfigAction(CookiesConsentComponent.COOKIES_CONSENT_CONFIG, this.currentConsentVersion));
  }

}
