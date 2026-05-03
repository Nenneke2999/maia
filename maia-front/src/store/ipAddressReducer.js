const initialState = {
    var_ipAddress: ''
};
  
const ipAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IP_ADDRESS':
            return {...state, var_ipAddress: action.payload};
        default:
            return state;
    }
};

export default ipAddressReducer;