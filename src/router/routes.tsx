import React from 'react';
import { Navigate } from 'react-router-dom';
import { lazyLoad } from './utils/lazy-load';
import { RoutePath } from './constant';
import type { RouteRecordRaw } from './types';
//主要的路由
const rootRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    element: <Navigate to={RoutePath.Home} />,
  },
  {
    path: RoutePath.Home,
    element: lazyLoad(React.lazy(() => import('@/pages/home'))),
    meta: {
      isAuth: false,
      title: '首页',
    },
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];
const routes = rootRoutes;
export { routes };
