import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EspacioBinarioComponent } from './espacio-binario.component';

describe('EspacioBinarioComponent', () => {
  let component: EspacioBinarioComponent;
  let fixture: ComponentFixture<EspacioBinarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacioBinarioComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacioBinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
