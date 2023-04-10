import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngxs/store';

import { UrlUtilsService } from '@dcs-libs/shared';
import { SidebarComponent } from './sidebar.component';
import { Location } from '@angular/common';

class StoreStub {
}

class UrlUtilsServiceStub {
  getUserImage = () => ''
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  SidebarComponent.prototype.ngOnInit = () => {
  };
  let location: any;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: UrlUtilsService, useClass: UrlUtilsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract the correct location', function() {
    jest.spyOn(location, 'path').mockReturnValue('');

    jest.spyOn(location, 'prepareExternalUrl').mockReturnValue('/dashboar/some');
    expect(component.extractCurrentLocation()).toEqual('/some');

    jest.spyOn(location, 'prepareExternalUrl').mockReturnValue('/dashboar/some/asdf');
    expect(component.extractCurrentLocation()).toEqual('/some/asdf');
  });
});
