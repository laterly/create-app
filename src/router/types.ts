export interface metaprops {
  hidden?: boolean; //是否隐藏，不显示到菜单栏的位置
  keepalive?: boolean; //开启keepAlive
  isauth?: boolean; //是否需要登录
  title: string; //标题
  key?: string; //key
  icon?: string; //图标
  selecticon?: string; //选中的图标
  islink?: string; //是否是外部链接
}
export interface routerecordraw {
  children?: routerecordraw[];
  element?: react.reactnode;
  index?: boolean;
  key?: string;
  path?: string;
  meta?: metaprops;
}
