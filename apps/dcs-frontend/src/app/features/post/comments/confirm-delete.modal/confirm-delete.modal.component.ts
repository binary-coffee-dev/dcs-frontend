import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngxs/store';

import { RemoveCommentAction } from '@dcs-libs/shared';

@Component({
  selector: 'app-confirm-delete.modal',
  templateUrl: './confirm-delete.modal.component.html',
  styleUrls: ['./confirm-delete.modal.component.scss']
})
export class ConfirmDeleteModalComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: {commentId: string}
  ) {
  }

  ok() {
    this.store.dispatch(new RemoveCommentAction(this.data.commentId)).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
