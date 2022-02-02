import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { ENVIRONMENT } from '@dcs-libs/shared';
import { NavbarComponent } from './navbar.component';

class StoreStub {
  select = () => of({})
}

class LocationStub {
  path = jest.fn();
  prepareExternalUrl = jest.fn();
}

const EXAMPLE_PATH = '/admin/dashboard';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [
        { provide: Location, useClass: LocationStub },
        { provide: Store, useClass: StoreStub },
        { provide: ENVIRONMENT, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());
    jest.spyOn(component, 'getTitle').mockReturnValue(EXAMPLE_PATH);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
