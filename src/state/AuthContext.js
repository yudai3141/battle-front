
import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

// 初期状態を定義
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
  redcard: false,
};

// 状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    // ユーザーが存在する場合のみローカルストレージに保存
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        redcard: state.redcard,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};