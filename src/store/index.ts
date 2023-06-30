import { configure } from 'mobx';
import { App } from './app';
configure({
  enforceActions: 'observed', //确保在使用store.name = 'xxx'来修改组件值，请使用action方法来触发
});
/** 将每个Store实例化 */
const store = {
  app: new App(),
};
export default store;
