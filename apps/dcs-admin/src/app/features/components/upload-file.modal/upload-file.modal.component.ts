import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

import {Store} from '@ngxs/store';

import {FileState, UploadFileAction} from '@dcs-libs/shared';


@Component({
  selector: 'app-upload-file.modal',
  templateUrl: './upload-file.modal.component.html',
  styleUrls: ['./upload-file.modal.component.scss']
})
export class UploadFileModalComponent implements OnInit {

  uploadFileForm = new FormGroup({
    name: new FormControl(''),
    file: new FormControl(''),
  });

  file = null;

  size: number = null;
  type: string = null;
  image: string | ArrayBuffer = null;

  uploadingImage = false;

  constructor(private store: Store, private dialogRef: MatDialogRef<UploadFileModalComponent>) {
  }

  ngOnInit() {
  }

  openFile(inputFile) {
    inputFile.click();
  }

  onFilesChange(event) {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      this.file = event.target.files[0];
      this.uploadFileForm.controls.name.setValue(this.file.name);
      this.size = this.file.size;
      this.type = this.file.type;

      const reader = new FileReader();
      reader.onload = () => this.image = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  getSize() {
    return `${Math.round(this.size / 1024 * 100) / 100} kB`;
  }

  upload() {
    if (!this.uploadingImage) {
      this.uploadingImage = true;
      this.store.dispatch(new UploadFileAction(this.file, this.uploadFileForm.controls.name.value)).subscribe(() => {
        this.dialogRef.close(this.store.selectSnapshot(FileState.newFile));
      });
    }
  }
}
