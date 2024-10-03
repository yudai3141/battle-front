const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
                redcard: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
                redcard: action.payload.redcard,
            };
        case "LOGIN_ERROR":
            return {
                user: null,
                isFetching: false,
                error: true,
                redcard: false,
            };
        case 'LOGOUT':
            return {
                user: null,
                isFetching: false,
                error: false,
                redcard: false,
            };

        // case 'LOGIN_BAN':
        //     return {
        //         user: action.payload,
        //         isFetching: false,
        //         error: false,
        //         redcard: action.payload.redcard,
        //     };
        default:
            return state;
    }
};

export default AuthReducer