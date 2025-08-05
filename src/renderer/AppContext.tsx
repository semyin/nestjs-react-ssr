import React, { createContext, useContext, PropsWithChildren } from 'react';

// 1. define the global state type
export interface IGlobalState {
  title: string;
  user: {
    isLoggedIn: boolean;
    name: string | null;
  } | null;
  theme: 'light' | 'dark';
}

// 2. create Context, and provide a default value
// the default value is used when there is no Provider, usually for testing or Storybook
const AppContext = createContext<IGlobalState | undefined>(undefined);

// 3. create a custom Hook, used to consume Context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// 4. create Provider component
// this component receives the initial state and provides it to all child components
interface AppProviderProps {
  initialState: IGlobalState;
}

export function AppProvider({ children, initialState }: PropsWithChildren<AppProviderProps>) {
  // currently, we only handle the initial state. If you need to change the state, you can introduce useState or useReducer here
  return (
    <AppContext.Provider value={initialState}>
      {children}
    </AppContext.Provider>
  );
}
