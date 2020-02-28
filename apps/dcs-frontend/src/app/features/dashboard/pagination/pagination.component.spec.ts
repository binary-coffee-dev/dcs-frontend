import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { PaginationComponent } from './pagination.component';
import { NextPageAction, PreviousPageAction } from '../../../core/redux/actions';

class StoreStub {
  dispatch = jest.fn();
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let store: StoreStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      providers: [
        { provide: Store, useClass: StoreStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the next page', () => {
    jest.spyOn(store, 'dispatch').mockImplementation(jest.fn());

    component.nextPage();

    expect(store.dispatch).toHaveBeenCalledWith(new NextPageAction());
  });

  it('should dispatch the previous page', () => {
    jest.spyOn(store, 'dispatch').mockImplementation(jest.fn());

    component.previousPage();

    expect(store.dispatch).toHaveBeenCalledWith(new PreviousPageAction());
  });
});
