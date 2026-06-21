import { Component, inject, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import { ConfigState, SetConfigAction } from '../../core/redux/states/config';
import consentVersions from '../../../assets/consent-versions.json';

@Component({
  selector: 'app-cookies-consent',
  templateUrl: './cookies-consent.component.html',
  styleUrls: ['./cookies-consent.component.scss'],
  standalone: false
})
export class CookiesConsentComponent {
  private store = inject(Store);

  static COOKIES_CONSENT_CONFIG = 'cookies-consent';

  currentConsentVersion = signal<string>(
    Object.keys(consentVersions)
      .sort()
      .reduce((prev, key) => `${prev}${key}:${(consentVersions as any)[key]}/`, '')
  );
  configCookiesConsent = toSignal(
    this.store.select(ConfigState.getConfigItem(CookiesConsentComponent.COOKIES_CONSENT_CONFIG)),
    { initialValue: '' }
  );
  showConsent = computed(() => {
    return this.configCookiesConsent() !== this.currentConsentVersion();
  });

  consentCookies() {
    this.store.dispatch(
      new SetConfigAction(
        CookiesConsentComponent.COOKIES_CONSENT_CONFIG,
        this.currentConsentVersion()
      )
    );
  }
}
