import createRootReducer from './createRootReducer';

const createStore = <S extends { [key: string]: any }>(props: {
  reducers: any;
  initialState?: S;
}) => {
  const { reducers, initialState } = props;

  const reducer = createRootReducer(reducers);
  const state = reducer(initialState, {
    type: '@@APP_STATE/INITIALIZE'
  });

  const bits = {} as S;

  Object.keys(state).forEach((value, index) => {
    bits[value] = 0;
    bits[value] |= 1 << index % 31;
  });

  return { state, reducer, bits };
};

export default createStore;
