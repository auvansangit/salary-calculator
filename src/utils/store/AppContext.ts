import { createContext } from 'react';
import calculateChangedBits from './bits';

const RootContext = createContext({} as any);
const AppContext = createContext({} as any, calculateChangedBits);

export { RootContext, AppContext };
