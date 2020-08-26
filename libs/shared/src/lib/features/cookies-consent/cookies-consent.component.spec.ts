import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { CookiesConsentComponent } from './cookies-consent.component';

class StoreStub {
}

describe('CookiesConsentComponent', () => {
  let component: CookiesConsentComponent;
  let fixture: ComponentFixture<CookiesConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CookiesConsentComponent],
      providers: [{provide: Store, useClass: StoreStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesConsentComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
