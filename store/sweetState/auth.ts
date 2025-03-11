import { StoreActionApi, createHook, createStore } from 'react-sweet-state';

// Define the auth state type
type AuthState = {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
};

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Define actions
const actions = {
  login:
    () =>
    ({ setState, getState }: StoreActionApi<AuthState>) =>
    async (email: string, password: string) => {
      const state = getState();
      
      // Don't login if already authenticated
      if (state.isAuthenticated) return;
      
      setState({
        ...state,
        loading: true,
        error: null,
      });

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login
        setState({
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'John Doe',
            email,
          },
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : 'Login failed',
        });
      }
    },

  logout:
    () =>
    ({ setState }: StoreActionApi<AuthState>) =>
    async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
    },

  clearError:
    () =>
    ({ setState, getState }: StoreActionApi<AuthState>) =>
    () => {
      const state = getState();
      setState({
        ...state,
        error: null,
      });
    },
};

// Create the store
export const AuthStore = createStore({
  initialState,
  actions,
  name: 'auth',
});

// Create hooks
export const useAuth = createHook(AuthStore); 