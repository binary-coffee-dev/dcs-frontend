import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateResponseService {

  constructor() {
  }

  formatResponseObjects(obj: any, parent: any = null, key: any | string = null) {
    if (!obj || typeof obj === 'boolean' || typeof obj === 'number' ||
      typeof obj === 'string' || typeof obj === 'undefined' || typeof obj === 'function') {
      return obj;
    }
    // toDo (gonzalezext)[05.05.23]: see if this can be done different
    let newObj = JSON.parse(JSON.stringify(obj));
    if (newObj.data && Array.isArray(newObj.data)) {
      const newList = newObj.data.map((d: any) => ({ ...d.attributes, id: d.id }));
      if (parent && key) {
        if (newObj.meta) {
          parent[`meta_${key}`] = newObj.meta;
        }
      }
      newObj = newList;
    } else if (newObj.data && (newObj.data.id || newObj.data.attributes)) {
      if (newObj.data.id) {
        newObj = { ...newObj, id: newObj.data.id };
      }
      if (newObj.data.attributes) {
        newObj = { ...newObj, ...newObj.data.attributes };
      }
      delete newObj.data;
    }
    for (const k of Object.keys(newObj)) {
      newObj[k] = this.formatResponseObjects(newObj[k], newObj, k);
    }
    return newObj;
  }
}
