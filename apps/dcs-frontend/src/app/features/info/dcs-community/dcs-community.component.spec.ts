import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcsCommunityComponent } from './dcs-community.component';

describe('DcsCommunityComponent', () => {
  let component: DcsCommunityComponent;
  let fixture: ComponentFixture<DcsCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcsCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcsCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
