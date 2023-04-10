import { File } from '../../models';
import { StateBase } from '../pagination-base.class';

export interface FileStateModel extends StateBase {
  elements: File[];
  newFile?: File;
}

export const initFileStateModel = () => {
  return {
    count: 0,
    newFile: undefined,
    elements: [],
    page: 0,
    pageSize: 5,
    firstPage: false,
    lastPage: false
  } as FileStateModel;
};
