import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { RecentPodcastsComponent } from './recent-podcasts.component';
import { MomentService } from '../../../core/services';

class StoreStub {
}

class MomentServiceStub {
}

describe('RecentPodcastsComponent', () => {
  let component: RecentPodcastsComponent;
  let fixture: ComponentFixture<RecentPodcastsComponent>;
  RecentPodcastsComponent.prototype.ngOnInit = jest.fn();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecentPodcastsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MomentService, useClass: MomentServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPodcastsComponent);
    component = fixture.componentInstance;

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
