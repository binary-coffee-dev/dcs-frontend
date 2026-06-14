import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngxs/store';

import { FileState, UploadFileAction } from '@dcs-libs/shared';

@Component({
  selector: 'app-upload-file.modal',
  templateUrl: './upload-file.modal.component.html',
  styleUrls: ['./upload-file.modal.component.scss'],
  standalone: false,
})
export class UploadFileModalComponent {
  private store = inject(Store);
  private dialogRef =
    inject<MatDialogRef<UploadFileModalComponent>>(MatDialogRef);

  uploadFileForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    file: new UntypedFormControl(''),
  });

  file = signal<File>(null);

  size = signal<number>(0);
  type = signal<string>('');
  image = signal<string | ArrayBuffer | null>(null);
  uploadingImage = signal<boolean>(false);

  getSize = computed(
    () => `${Math.round((this.size() / 1024) * 100) / 100} kB`
  );

  openFile(inputFile: HTMLInputElement) {
    inputFile.click();
  }

  onFilesChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (
      inputElement.files &&
      inputElement.files?.length > 0 &&
      inputElement.files[0]
    ) {
      this.file.set(inputElement.files[0]);
      if (this.file()) {
        this.uploadFileForm.controls['name'].setValue(this.file().name);
        this.size.set(this.file().size);
        this.type.set(this.file().type);

        const reader = new FileReader();
        reader.onload = () => this.image.set(reader.result);
        reader.readAsDataURL(this.file());
      }
    }
  }

  upload() {
    if (!this.uploadingImage() && this.file()) {
      this.uploadingImage.set(true);
      this.store
        .dispatch(
          new UploadFileAction(
            this.file(),
            this.uploadFileForm.controls['name'].value
          )
        )
        .subscribe(() => {
          this.dialogRef.close(this.store.selectSnapshot(FileState.newFile));
        });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
