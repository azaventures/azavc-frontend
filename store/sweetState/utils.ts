import { Store, StoreActionApi, createHook } from 'react-sweet-state';

// Type for store actions
export type Action<State, StoreProps = void> = (
  api: StoreActionApi<State>,
  props: StoreProps
) => void | Promise<void>;

// Type for store actions collection
export type StoreActions<State, StoreProps = void> = {
  [key: string]: Action<State, StoreProps>;
};

// Helper to create a hook for actions only
export function createActionsHook<State, Actions extends StoreActions<State, StoreProps>, StoreProps = void>(
  store: Store<State, any>
) {
  return createHook(store, {
    selector: null,
  });
} 