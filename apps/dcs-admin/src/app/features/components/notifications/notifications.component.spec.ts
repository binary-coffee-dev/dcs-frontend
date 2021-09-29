import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Store } from '@ngxs/store';

import { NotificationsComponent } from './notifications.component';

class StoreStub {
}

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
      providers: [{provide: Store, useClass: StoreStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
