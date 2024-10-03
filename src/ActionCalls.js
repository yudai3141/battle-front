import axios from "axios";

export const loginCall = async(user, dispatch) => {
    dispatch({
        type: "LOGIN_START"
    });
    try {
        const response = await axios.post("auth/login",user);
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data
        });
    } catch(e) {
        dispatch({
            type: "LOGIN_ERROR",
            payload: e
        });
    }
};

export const exclude = async(user, dispatch) => {
    const response = await axios.get("users/",user)
    dispatch({
        type: "LOGIN_BAN",
        payload: user
    });
}