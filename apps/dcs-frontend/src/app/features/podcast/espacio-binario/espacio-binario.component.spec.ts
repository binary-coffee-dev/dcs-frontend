import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EspacioBinarioComponent } from './espacio-binario.component';
import { Store } from '@ngxs/store';
import { MomentService } from '../../../core/services';

class StoreStub {
}

class MomentServiceStub {
}

describe('EspacioBinarioComponent', () => {
  let component: EspacioBinarioComponent;
  let fixture: ComponentFixture<EspacioBinarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EspacioBinarioComponent],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MomentService, useClass: MomentServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacioBinarioComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
