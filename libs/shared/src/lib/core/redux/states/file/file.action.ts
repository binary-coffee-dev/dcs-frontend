export class FetchFilesAction {
  static readonly type = '[File] Fetch files';

  constructor(public pageSize: number = 5) {
  }
}

export class NextFilesPageAction {
  static readonly type = '[File] Next page';
}

export class PreviousFilesPageAction {
  static readonly type = '[File] Previous page';
}

export class ChangeFilesPageAction {
  static readonly type = '[File] Change page';

  constructor(public page: number) {
  }
}

export class ChangeQueryAction {
  static readonly type = '[File] Change query';

  constructor(public where: any) {
  }
}

export class RemoveFileAction {
  static readonly type = '[File] Remove file action';

  constructor(public id: string) {
  }
}

export class UploadFileAction {
  static readonly type = '[File] Upload file';

  constructor(public file: File, public name: string | null = null) {
  }
}
