import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { NextPageAction, PreviousPageAction } from '@dcs-libs/shared';
import { PaginationComponent } from './pagination.component';
import { ScrollService } from '../../../core/services';

class StoreStub {
  dispatch = jest.fn();
}

class ScrollServiceStub {
  smoothScroll = jest.fn();
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let store: Store;
  PaginationComponent.prototype.ngOnInit = jest.fn();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: ScrollService, useClass: ScrollServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the next page', () => {
    jest.spyOn(store, 'dispatch').mockReturnValue(of());

    component.nextPage();

    expect(store.dispatch).toHaveBeenCalledWith(new NextPageAction());
  });

  it('should dispatch the previous page', () => {
    jest.spyOn(store, 'dispatch').mockReturnValue(of());

    component.previousPage();

    expect(store.dispatch).toHaveBeenCalledWith(new PreviousPageAction());
  });
});
