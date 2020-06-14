import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {PostInfoComponent} from './post-info.component';
import {Store} from '@ngxs/store';
import {MatDialog} from '@angular/material';
import {MomentService, ResourceService} from '../../../core/services';

class StoreStub {
}

class MatDialogStub {
}

class ResourceServiceStub {
}

class MomentServiceStub {
}

describe('PostInfoComponent', () => {
  let component: PostInfoComponent;
  let fixture: ComponentFixture<PostInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostInfoComponent],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MatDialog, useClass: MatDialogStub},
        {provide: ResourceService, useClass: ResourceServiceStub},
        {provide: MomentService, useClass: MomentServiceStub},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostInfoComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
