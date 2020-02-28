import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { CommentsComponent } from './comments.component';

class StoreStub {
}

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useClass: StoreStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit').and.callFake(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the text is only white spaces', () => {
    expect(component.checkEmptySpaces('    ')).toBeFalsy();
    expect(component.checkEmptySpaces('')).toBeFalsy();
    expect(component.checkEmptySpaces('  as  ')).toBeTruthy();
    expect(component.checkEmptySpaces('Algo some')).toBeTruthy();
  });
});
