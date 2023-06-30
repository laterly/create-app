/**
 * 存储一些全局的app数据
 */
import { makeAutoObservable } from 'mobx';
export class App {
  pageRouteLevel: null | (() => Promise<void>) = null;
  constructor() {
    makeAutoObservable(this);
  }
  setPageRouteLevel(fn: null | (() => Promise<void>)) {
    this.pageRouteLevel = fn;
  }
}
