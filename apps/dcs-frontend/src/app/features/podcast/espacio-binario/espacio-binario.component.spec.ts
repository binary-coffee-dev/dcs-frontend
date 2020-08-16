import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacioBinarioComponent } from './espacio-binario.component';

describe('EspacioBinarioComponent', () => {
  let component: EspacioBinarioComponent;
  let fixture: ComponentFixture<EspacioBinarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacioBinarioComponent ]
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
