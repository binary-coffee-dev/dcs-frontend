import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { ENVIRONMENT, HasPermissionsPipeStub, WINDOW } from '@dcs-libs/shared';
import { PostComponent } from './post.component';
import { MomentService, ResourceService, ScrollService } from '../../core/services';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

class StoreStub {
}

class MomentServiceStub {
}

class ResourceServiceStub {
}

class ScrollServiceStub {
}

class MatDialogStub {
}

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  PostComponent.prototype.ngOnInit = () => {};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostComponent, HasPermissionsPipeStub],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MomentService, useClass: MomentServiceStub},
        {provide: ScrollService, useClass: ScrollServiceStub},
        {provide: ResourceService, useClass: ResourceServiceStub},
        {provide: ENVIRONMENT, useValue: {}},
        {provide: WINDOW, useValue: {}},
        {provide: MatDialog, useClass: MatDialogStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
