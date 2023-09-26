import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = (props) => {

    const navigate = useNavigate()

    const logIn = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const newErrors = [];
        if (email === '') {
            newErrors.push('Email lub hasło nieprawidłowe');
        }
        if (password === '') {
            newErrors.push('Email lub hasło nieprawidłowe');
        }
        if (newErrors.length > 0) {
            props.setErrors(newErrors);
        } else {
            props.setErrors([]);
            axios.post("http://localhost:8001/user/login", {
                email,
                password
            })
                .then((res) => {
                    localStorage.setItem('jwt', res.data.jwt)
                    props.setToken(res.data.jwt)
                    navigate('/customer/')
                })
        }
    }


    return (
        <div className="formAdd">
            <h2>Zaloguj się</h2>
            <div className="errors" style={{ display: props.errors.length > 0 ? 'block' : 'none' }}>
                <ul>
                    {props.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={logIn}>
                <label htmlFor="email">Adres email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Hasło</label>
                <input type="password" name="password" id="password" />
                <button type="submit" className="addBtn">Zaloguj</button>
            </form>


            dane do zalogowania

            login login@gmail.com
            hasło: 123456a


        </div>
    )
}

export default Login;