import { AuthStore } from './auth';
import React from 'react';
import { UIStore } from './ui';

// Provider component to wrap the app with all stores
export function SweetStateProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
} 