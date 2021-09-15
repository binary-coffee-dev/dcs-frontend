import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngxs/store';

import { ENVIRONMENT, WINDOW, MaterialModule } from '@dcs-libs/shared';
import { LoginButtonComponent } from './login-button.component';
import { RouterTestingModule } from '@angular/router/testing';

class StoreStub {}

const env = {
  siteDashboardUrl: 'http://binary-coffee.dev/dasboard'
};
const window = {
  location: { href: '' }
};

describe('LoginButtonComponent', () => {
  let component: LoginButtonComponent;
  let fixture: ComponentFixture<LoginButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginButtonComponent],
      providers: [
        { provide: WINDOW, useFactory: () => window },
        { provide: ENVIRONMENT, useFactory: () => env },
        { provide: Store, useClass: StoreStub }
      ],
      imports: [MaterialModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginButtonComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login (corner case)', () => {
    window.location.href = 'http://binary-coffee.dev/post/this-is-a-test';

    component.loginAction();

    expect(window.location.href).toEqual(
      'http://binary-coffee.dev/dasboard/login?redir=http%3A%2F%2Fbinary-coffee.dev%2Fpost%2Fthis-is-a-test'
    );
  });

  it('should redirect to login (with slash symbol in the env)', () => {
    window.location.href = 'http://binary-coffee.dev/post/this-is-a-test';
    env.siteDashboardUrl = 'http://binary-coffee.dev/dasboard/';

    component.loginAction();

    expect(window.location.href).toEqual(
      'http://binary-coffee.dev/dasboard/login?redir=http%3A%2F%2Fbinary-coffee.dev%2Fpost%2Fthis-is-a-test'
    );
  });

  it('should redirect to login (local environment)', () => {
    window.location.href = 'http://localhost:4200/post/test-sip';
    env.siteDashboardUrl = 'http://localhost:4201/';

    component.loginAction();

    expect(window.location.href).toEqual(
      'http://localhost:4201/login?redir=http%3A%2F%2Flocalhost%3A4200%2Fpost%2Ftest-sip'
    );
  });
});
