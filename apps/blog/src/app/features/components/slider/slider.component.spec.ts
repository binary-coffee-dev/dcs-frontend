import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { SliderComponent } from './slider.component';
import { ENVIRONMENT, UrlUtilsService } from '@dcs-libs/shared';

class StoreStub {
  select = () => of([]);
}

class UrlUtilsServiceStub {
}

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: UrlUtilsService, useClass: UrlUtilsServiceStub },
        { provide: ENVIRONMENT, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
