import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPodcastsComponent } from './recent-podcasts.component';

describe('RecentPodcastsComponent', () => {
  let component: RecentPodcastsComponent;
  let fixture: ComponentFixture<RecentPodcastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPodcastsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPodcastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
