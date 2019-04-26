import { useMemo, useReducer } from 'react';

const useLocalState = <S, A extends { [key: string]: any }>(
  reducer: (state: S, action: any) => S,
  actionCreators: A,
  initialState?: S
): [S, A] => {
  const localState = reducer(initialState!, {
    type: '@@LOCAL_STATE/INITIALIZE'
  });
  const [state, dispatch] = useReducer(reducer, localState);

  const actions = useMemo(() => {
    const retActions = {} as A;

    Object.keys(actionCreators).forEach(key => {
      retActions[key] = async (...args: any[]) => {
        const action = await actionCreators[key](...args);

        if (typeof action === 'function') {
          action(dispatch, state);
        }

        dispatch(action);
      };
    });

    return retActions;
  }, [actionCreators, state]);

  return [state, actions];
};

export default useLocalState;
