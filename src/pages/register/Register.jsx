import React, { useRef } from 'react';
import "./Register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const passwordConfirmation = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // パスワードが確認用と一致しているか確認
        if (password.current.value !== passwordConfirmation.current.value) {
            passwordConfirmation.current.setCustomValidity("パスワードが違います");
        } else {
            try {
                const user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                };
                // register apiを叩く
                await axios.post("/auth/register",user);
                navigate("/login");
            } catch(e) {
                console.log(e);
            }
        }
    };

  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className='loginLogo'>Battle'n'Chu</h3>
                <span className="loginDesc">誤情報のない世界へ</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                    <p className='loginMessage'>新規登録はこちら</p>
                    <input type="text" className="loginInput" placeholder='ユーザー名' required ref={username} />
                    <input type="email" className="loginInput" placeholder='Eメール' required ref={email} />
                    <input type="password" className="loginInput" placeholder='パスワード' required minLength="6" ref={password} />
                    <input type="password" className="loginInput" placeholder='確認用パスワード' required ref={passwordConfirmation} />

                    <button className='loginButton' type="submit">サインアップ</button>
                    <button className="loginRegisterButton">ログイン</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
