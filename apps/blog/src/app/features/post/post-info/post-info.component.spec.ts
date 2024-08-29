import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { Store } from '@ngxs/store';

import { PostInfoComponent } from './post-info.component';
import { ResourceService } from '../../../core/services';
import { MomentService } from "@dcs-libs/shared";

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
  PostInfoComponent.prototype.ngOnInit = jest.fn();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PostInfoComponent],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MatDialogRef, useClass: MatDialogStub},
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

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
