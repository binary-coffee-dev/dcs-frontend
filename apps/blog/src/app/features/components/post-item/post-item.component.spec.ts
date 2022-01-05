import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UrlUtilsService } from '@dcs-libs/shared';
import { PostItemComponent } from './post-item.component';
import { MomentService, ResourceService } from '../../../core/services';

class MomentServiceStub {
}

class ResourceServiceStub {
}

class UrlUtilsServiceStub {
}

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PostItemComponent],
      providers: [
        {provide: MomentService, useClass: MomentServiceStub},
        {provide: ResourceService, useClass: ResourceServiceStub},
        {provide: UrlUtilsService, useClass: UrlUtilsServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
