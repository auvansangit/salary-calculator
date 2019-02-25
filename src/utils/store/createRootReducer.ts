interface Reducer extends Function {
  (state: { [key: string]: any }, action: any): any;
}

interface Reducers {
  [key: string]: Reducer;
}

const createRootReducer = (reducers: Reducers) => {
  const reducerKeys = Object.keys(reducers);
  const fnReducers = {} as Reducers;

  reducerKeys.forEach(key => {
    if (typeof reducers[key] === 'function') {
      fnReducers[key] = reducers[key];
    }
  });

  const fnReducerKeys = Object.keys(fnReducers);

  return <S extends { [key: string]: any }>(
    state = {} as S,
    action: any
  ): S => {
    let hasChanged = false;
    const nextState = {} as any;

    fnReducerKeys.forEach(key => {
      const reducer = fnReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    });

    return hasChanged ? nextState : state;
  };
};

export default createRootReducer;
