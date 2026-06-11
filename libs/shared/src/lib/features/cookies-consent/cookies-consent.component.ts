import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngxs/store';

import { ConfigState, SetConfigAction } from '../../core/redux/states/config';
import consentVersions from '../../../assets/consent-versions.json';

@Component({
    selector: 'app-cookies-consent',
    templateUrl: './cookies-consent.component.html',
    styleUrls: ['./cookies-consent.component.scss'],
    standalone: false
})
export class CookiesConsentComponent implements OnInit {
  private store = inject(Store);


  static COOKIES_CONSENT_CONFIG = 'cookies-consent';

  currentConsentVersion = '';
  showConsent = false;

  constructor() {
    if (consentVersions) {
      this.currentConsentVersion = Object.keys(consentVersions).sort()
        .reduce(((p, k, i) => `${p}${k}:${(consentVersions as any)[k]}/`), '');
    }
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
