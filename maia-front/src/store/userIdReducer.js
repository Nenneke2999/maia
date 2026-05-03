const initialState = {
    var_userId: ''
};

const userIdReducer = (state = initialState, action) => {
    switch (action.type) {  
        case 'SET_USER_ID':
            return {...state, var_userId: action.payload};
    default:
        return state;
    }
};

export default userIdReducer;
  