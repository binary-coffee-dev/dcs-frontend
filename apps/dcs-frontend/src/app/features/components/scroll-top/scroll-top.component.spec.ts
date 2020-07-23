import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ScrollTopComponent } from './scroll-top.component';
import { ScrollService } from '../../../core/services';

class ScrollServiceStub {
  smoothScroll = jest.fn();
}

describe('ScrollTopComponent', () => {
  let component: ScrollTopComponent;
  let fixture: ComponentFixture<ScrollTopComponent>;
  let scrollService: ScrollServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollTopComponent],
      providers: [
        {provide: ScrollService, useClass: ScrollServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollTopComponent);
    scrollService = TestBed.get(ScrollService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the scroll up method', () => {
    component.scrollToTop();

    expect(scrollService.smoothScroll).toHaveBeenCalled();
  });
});
