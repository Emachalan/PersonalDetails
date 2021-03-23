export const constants = {
  FIRST_CALL: "FIRST_CALL",
  FIRST_CALL_SUCCESS: 'FIRST_CALL_SUCCESS',
  FIRST_CALL_FAILURE: "FIRST_CALL_FAILURE",
};

export const actions = {
  firstCall: (params: any) => {
    return {
      type: constants.FIRST_CALL,
      payload: params
    };
  },
  firstCallSuccess: (params: any) => {
    return {
      type: constants.FIRST_CALL_SUCCESS,
      payload: params
    };
  },
  firstCallFailure: (params: any) => {
    return {
      type: constants.FIRST_CALL_FAILURE,
      payload: params
    };
  },
};
export const initialState = {
  details:null,
};

export const initialReducer = (state = initialState, action: {type: string | number, payload: any}) => {
  switch (action.type) {
    case constants.FIRST_CALL:
      return {
        ...state,
        details: action.payload
      };
    default:
      return state;
  }
};

export default actions;
