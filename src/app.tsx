import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider as MobxProvider, observer } from 'mobx-react';
import store from './store';
import Router, { AuthRouter } from '@/router';
const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthRouter>
        <MobxProvider {...store}>
          <Router />
        </MobxProvider>
      </AuthRouter>
    </HashRouter>
  );
};
export default observer(App);
