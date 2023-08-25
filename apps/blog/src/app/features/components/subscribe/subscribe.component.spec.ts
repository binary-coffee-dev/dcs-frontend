import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngxs/store';

import { SubscribeComponent } from './subscribe.component';

class StoreStub {
}

describe('SubscribeComponent', () => {
  let component: SubscribeComponent;
  let fixture: ComponentFixture<SubscribeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SubscribeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: Store, useClass: StoreStub}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
