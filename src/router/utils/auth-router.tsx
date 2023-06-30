import React from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { searchRoute } from './search-route';
import { routes } from '../routes';

/**
 * @description 路由守卫组件
 * */
export const AuthRouter: React.FC<React.PropsWithChildren<any>> = observer(
  props => {
    const { pathname } = useLocation();
    const route = searchRoute(pathname, routes);
    if (!route.meta?.isAuth) return props.children;

    return props.children;
  },
);
