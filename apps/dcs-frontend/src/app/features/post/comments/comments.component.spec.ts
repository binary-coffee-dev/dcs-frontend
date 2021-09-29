import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { UrlUtilsService } from '@dcs-libs/shared';
import { CommentsComponent } from './comments.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ScrollService } from '../../../core/services';
import { MatDialog } from '@angular/material/dialog';

class StoreStub {
}

class UrlUtilsServiceStub {
}

class ScrollServiceStub {
}

class MatDialogStub {
}

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CommentsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: UrlUtilsService, useClass: UrlUtilsServiceStub},
        {provide: ScrollService, useClass: ScrollServiceStub},
        {provide: MatDialog, useClass: MatDialogStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

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
