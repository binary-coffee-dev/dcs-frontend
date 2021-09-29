import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Actions } from '@ngxs/store';

import { LoadingComponent } from './loading.component';

class ActionsStub {}

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [{ provide: Actions, useClass: ActionsStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;

    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
