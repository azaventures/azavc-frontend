import { StoreActionApi, createHook, createStore } from 'react-sweet-state';

// Define the UI state type
type UIState = {
  theme: 'light' | 'dark' | 'system';
  isDrawerOpen: boolean;
  activeTab: string;
  loading: {
    [key: string]: boolean;
  };
};

// Initial state
const initialState: UIState = {
  theme: 'system',
  isDrawerOpen: false,
  activeTab: 'home',
  loading: {},
};

// Define actions
const actions = {
  setTheme:
    () =>
    ({ setState, getState }: StoreActionApi<UIState>) =>
    (theme: 'light' | 'dark' | 'system') => {
      const state = getState();
      setState({
        ...state,
        theme,
      });
    },

  toggleDrawer:
    () =>
    ({ setState, getState }: StoreActionApi<UIState>) =>
    () => {
      const state = getState();
      setState({
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      });
    },

  setDrawerOpen:
    () =>
    ({ setState, getState }: StoreActionApi<UIState>) =>
    (isOpen: boolean) => {
      const state = getState();
      setState({
        ...state,
        isDrawerOpen: isOpen,
      });
    },

  setActiveTab:
    () =>
    ({ setState, getState }: StoreActionApi<UIState>) =>
    (tab: string) => {
      const state = getState();
      setState({
        ...state,
        activeTab: tab,
      });
    },

  setLoading:
    () =>
    ({ setState, getState }: StoreActionApi<UIState>) =>
    (key: string, isLoading: boolean) => {
      const state = getState();
      setState({
        ...state,
        loading: {
          ...state.loading,
          [key]: isLoading,
        },
      });
    },
};

// Create the store
export const UIStore = createStore({
  initialState,
  actions,
  name: 'ui',
});

// Create hooks
export const useUI = createHook(UIStore); 