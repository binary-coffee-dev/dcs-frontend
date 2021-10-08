import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { MaterialModule } from '@dcs-libs/shared';
import { PodcastListComponent } from './podcast-list.component';
import { MomentService } from '../../../core/services';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

class StoreStub {
}

class MomentServiceStub {
}

describe('PodcastListComponent', () => {
  let component: PodcastListComponent;
  let fixture: ComponentFixture<PodcastListComponent>;
  PodcastListComponent.prototype.ngOnInit = jest.fn();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PodcastListComponent],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MomentService, useClass: MomentServiceStub},
        { provide: MATERIAL_SANITY_CHECKS, useValue: false }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MaterialModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastListComponent);
    component = fixture.componentInstance;

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
