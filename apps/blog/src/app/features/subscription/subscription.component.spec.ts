import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngxs/store';

import { SubscriptionComponent } from './subscription.component';

class StoreStub {
}

describe('SubscriptionComponent', () => {
  let component: SubscriptionComponent;
  let fixture: ComponentFixture<SubscriptionComponent>;
  SubscriptionComponent.prototype.ngOnInit = jest.fn();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SubscriptionComponent],
      providers: [{ provide: Store, useClass: StoreStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionComponent);
    component = fixture.componentInstance;

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
