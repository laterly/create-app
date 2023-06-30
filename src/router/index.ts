import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
const Router = () => {
  //@ts-ignore
  const getRoutes = useRoutes(routes);
  return getRoutes;
};
export { routes } from "./routes";
export { AuthRouter } from "./utils/auth-router";
export { searchRoute } from "./utils/search-route";
export type { RouteRecordRaw, MetaProps } from "./types"; //暴露路由类型
export * from "./constant"; //暴露路由枚举路径
export default Router; //暴露路由
