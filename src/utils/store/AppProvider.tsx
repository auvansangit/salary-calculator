import React, { useReducer, useMemo } from 'react';
import { RootContext, AppContext } from './AppContext';

type AppProviderProps = {
  store: {
    state: { [key: string]: any };
    reducer: <S, A>(state: S, action: A) => S;
    bits: { [key: string]: any };
  };
  children?: React.ReactNode;
};

const AppProvider = (props: AppProviderProps) => {
  const {
    store: { state, reducer, bits },
    children
  } = props;

  const [appState, dispatch] = useReducer(reducer, state);
  const rootValue = useMemo(() => [bits, dispatch], []);

  return (
    <RootContext.Provider value={rootValue}>
      <AppContext.Provider value={appState}>{children}</AppContext.Provider>
    </RootContext.Provider>
  );
};

export default AppProvider;
