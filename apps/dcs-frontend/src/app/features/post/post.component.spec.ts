import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {Store} from '@ngxs/store';

import {PostComponent} from './post.component';
import {MomentService, ResourceService, ScrollService} from '../../core/services';
import {ENVIRONMENT} from '@dcs-libs/shared';

class StoreStub {
}

class MomentServiceStub {
}

class ResourceServiceStub {
}

class ScrollServiceStub {
}

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MomentService, useClass: MomentServiceStub},
        {provide: ScrollService, useClass: ScrollServiceStub},
        {provide: ResourceService, useClass: ResourceServiceStub},
        {provide: ENVIRONMENT, useValue: {}}
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
