import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngxs/store';

import { NotificationsComponent } from './notifications.component';
import { of } from 'rxjs';

class StoreStub {
  select = () => of([]);
}

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
      providers: [{ provide: Store, useClass: StoreStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
