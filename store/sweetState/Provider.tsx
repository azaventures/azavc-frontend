import { AuthStore } from './auth';
import React from 'react';
import { UIStore } from './ui';
import StoreProvider from 'react-sweet-state';

// Provider component to wrap the app with all stores
export function SweetStateProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider stores={[AuthStore, UIStore]}>
      {children}
    </StoreProvider>
  );
}