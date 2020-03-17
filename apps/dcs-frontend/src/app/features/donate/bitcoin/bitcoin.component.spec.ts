import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinComponent } from './bitcoin.component';

describe('BitcoinComponent', () => {
  let component: BitcoinComponent;
  let fixture: ComponentFixture<BitcoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitcoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
