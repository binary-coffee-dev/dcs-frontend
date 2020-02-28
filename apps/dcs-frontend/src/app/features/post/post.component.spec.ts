import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {Store} from '@ngxs/store';

import {PostComponent} from './post.component';
import {MomentService, ResourceService} from '../../core/services';

class StoreStub {
}

class MomentServiceStub {
}

class ResourceServiceStub {
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
        {provide: ResourceService, useClass: ResourceServiceStub}
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
