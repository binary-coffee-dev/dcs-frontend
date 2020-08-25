import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesConsentComponent } from './cookies-consent.component';

describe('CookiesConsentComponent', () => {
  let component: CookiesConsentComponent;
  let fixture: ComponentFixture<CookiesConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiesConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
