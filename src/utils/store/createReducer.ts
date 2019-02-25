const createReducer = <S, A extends { [key: string]: any }>(
  initialState: S,
  handlers: { [key: string]: any }
) => {
  return (state: S, action: A): S => {
    state = state || initialState;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
};

export default createReducer;
