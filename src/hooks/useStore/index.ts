// /hooks/useStore.tsx
import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';
import store from '@/store';
// 根据RootStore来实现参数的自动获取和返回值的自动推导
function useStore<T extends typeof store, V extends keyof T>(name: V): T[V] {
  const rootStore = useContext(MobXProviderContext) as T;
  return rootStore[name];
}
export default useStore;
