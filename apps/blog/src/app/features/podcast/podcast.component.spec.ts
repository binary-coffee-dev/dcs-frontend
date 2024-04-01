import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from "@ngxs/store";
import { of } from "rxjs";

import { PodcastComponent } from './podcast.component';

class StoreStub {
  select = () => (of([]));
  dispatch = jest.fn();
}

describe('PodcastComponent', () => {
  let component: PodcastComponent;
  let fixture: ComponentFixture<PodcastComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PodcastComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: Store, useClass: StoreStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastComponent);
    component = fixture.componentInstance;

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
