import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareButtomsComponent } from './share-buttoms.component';

describe('ShareButtomsComponent', () => {
  let component: ShareButtomsComponent;
  let fixture: ComponentFixture<ShareButtomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareButtomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareButtomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
