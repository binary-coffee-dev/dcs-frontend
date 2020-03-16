import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {
  ChangeFilesPageAction,
  CreateNotificationAction,
  FetchFilesAction,
  NextFilesPageAction,
  PreviousFilesPageAction,
  UploadFileAction
} from '../actions';
import {File, NotificationType} from '../models';
import {FileStateModel, initFileStateModel} from './file-state.model';
import {PaginationBaseClass, ResponseData, StateBase} from './pagination-base.class';
import {FileService} from '../services';

@State<FileStateModel>({
  name: 'file',
  defaults: initFileStateModel()
})
export class FileState extends PaginationBaseClass<FileStateModel> {

  @Selector()
  static files(state: FileStateModel): File[] {
    return state.elements;
  }

  @Selector()
  static firstPage(state: FileStateModel): boolean {
    return state.firstPage;
  }

  @Selector()
  static lastPage(state: FileStateModel): boolean {
    return state.lastPage;
  }

  @Selector()
  static pageIndicators(state: FileStateModel): StateBase {
    return {...state} as StateBase;
  }

  @Selector()
  static newFile(state: FileStateModel): File {
    return state.newFile;
  }

  constructor(private fileService: FileService) {
    super();
  }

  @Action(FetchFilesAction)
  fetchFilesAction(ctx: StateContext<FileStateModel>, action: FetchFilesAction) {
    ctx.patchState({pageSize: action.pageSize || ctx.getState().pageSize});
    const pageSize = ctx.getState().pageSize;
    const start = ctx.getState().page * pageSize;
    const where = ctx.getState().where || {};
    return this.fetchPage(pageSize, start, where, ctx);
  }

  @Action(NextFilesPageAction)
  nextPageAction(ctx: StateContext<FileStateModel>) {
    return this.nextPage(ctx);
  }

  @Action(PreviousFilesPageAction)
  previousPageAction(ctx: StateContext<FileStateModel>) {
    return this.previousPage(ctx);
  }

  @Action(ChangeFilesPageAction)
  changeFilesPageAction(ctx: StateContext<FileStateModel>, action: ChangeFilesPageAction) {
    return this.pageByNumber(ctx, action.page);
  }

  @Action(UploadFileAction)
  uploadFile(ctx: StateContext<FileStateModel>, action: UploadFileAction) {
    return this.fileService.uploadFile(action.file, action.name).pipe(
      tap((file: File) => {
        ctx.patchState({newFile: file});
        ctx.dispatch(new CreateNotificationAction(`Archivo ${file.name} creado correctamente.`, NotificationType.info));
      }),
      catchError(error => {
        ctx.patchState({newFile: null});
        ctx.dispatch(new CreateNotificationAction(`Errores al subir el archivo: ${action.name}`, NotificationType.info));
        return error;
      })
    );
  }

  fetchElements(pageSize, start, where): Observable<ResponseData> {
    return this.fileService.fetchFiles(pageSize, start);
  }
}
