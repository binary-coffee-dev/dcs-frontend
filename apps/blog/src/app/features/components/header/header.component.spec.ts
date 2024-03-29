import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ENVIRONMENT, MaterialModule, WINDOW } from '@dcs-libs/shared';
import { HeaderComponent } from './header.component';

const env = {
  siteUrl: 'http://binary-coffee.dev'
};
const window = {
  location: { href: '' }
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      providers: [
        { provide: WINDOW, useFactory: () => window },
        { provide: ENVIRONMENT, useFactory: () => env }
      ],
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
