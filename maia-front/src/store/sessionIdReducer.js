const initialState = {
    var_sessionId: ''
};

const sessionIdReducer = (state = initialState, action) => {
    switch (action.type) {  
        case 'SET_SESSION_ID':
            return {...state, var_sessionId: action.payload};
    default:
        return state;
    }
};

export default sessionIdReducer;
  