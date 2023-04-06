import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { Store } from '@ngxs/store';

import { FileState, UploadFileAction } from '@dcs-libs/shared';


@Component({
  selector: 'app-upload-file.modal',
  templateUrl: './upload-file.modal.component.html',
  styleUrls: ['./upload-file.modal.component.scss']
})
export class UploadFileModalComponent implements OnInit {

  uploadFileForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    file: new UntypedFormControl(''),
  });

  file = null;

  size: number = 0;
  type: string = '';
  image: string | ArrayBuffer | null = null;

  uploadingImage = false;

  constructor(private store: Store, private dialogRef: MatDialogRef<UploadFileModalComponent>) {
  }

  ngOnInit() {
  }

  openFile(inputFile: any) {
    inputFile.click();
  }

  onFilesChange(event: any) {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      this.file = event.target.files[0];
      if (this.file) {
        this.uploadFileForm.controls['name'].setValue(this.file['name']);
        this.size = this.file['size'];
        this.type = this.file['type'];

        const reader = new FileReader();
        reader.onload = () => this.image = reader.result;
        reader.readAsDataURL(this.file);
      }
    }
  }

  getSize() {
    return `${Math.round(this.size / 1024 * 100) / 100} kB`;
  }

  upload() {
    if (!this.uploadingImage && this.file) {
      this.uploadingImage = true;
      this.store.dispatch(new UploadFileAction(this.file, this.uploadFileForm.controls['name'].value)).subscribe(() => {
        this.dialogRef.close(this.store.selectSnapshot(FileState.newFile));
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
