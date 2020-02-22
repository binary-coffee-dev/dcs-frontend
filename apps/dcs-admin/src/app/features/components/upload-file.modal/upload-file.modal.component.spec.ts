import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UploadFileModalModule} from './upload-file.modal.module';


describe('UploadFile.ModalComponent', () => {
  let component: UploadFileModalModule;
  let fixture: ComponentFixture<UploadFileModalModule>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFileModalModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileModalModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
