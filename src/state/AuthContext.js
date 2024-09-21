import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer"

// 最初のユーザー状態を定義
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    // user: {
    //     _id: "66d44016f3efa1e8d9661b99",
    //     username: "yudai",
    //     email: "yudai@gmail.com",
    //     password: "abcdef",
    //     profilePicture: "/person/1.jpeg",
    //     coverPicture: "",
    //     followes: [],
    //     followings: [],
    //     isAdmin: false,
    // },
    isFetching: false,
    error: false,
};

//状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return <AuthContext.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
    }}>
        {children}
    </AuthContext.Provider>;
}
