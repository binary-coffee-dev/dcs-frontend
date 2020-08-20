import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';


import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { MaterialModule } from '@dcs-libs/shared';
import { SimilarPostsListComponent } from './similar-posts-list.component';
import { ResourceService } from '../../../core/services';

class StoreStub {
  select = jest.fn();
}

class ResourceServiceStub {
}

describe('SimilarPostsListComponent', () => {
  let component: SimilarPostsListComponent;
  let fixture: ComponentFixture<SimilarPostsListComponent>;
  let store: StoreStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarPostsListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: ResourceService, useClass: ResourceServiceStub }
      ],
      imports: [MaterialModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarPostsListComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
