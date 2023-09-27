import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUp = (props) => {

  const navigate = useNavigate();

  const addUser = (e) => {
    e.preventDefault();
    const login = e.target.login.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    const newErrors = [];

    if (login === '') {
      newErrors.push('Imię i nazwisko są wymagane');
    }
    if (email === '') {
      newErrors.push('Adres email jest wymagany');
    }
    if (!/^[^\s]*$/.test(email.trim())) {
      newErrors.push('Adres email nie może zawierać przerw');
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      newErrors.push('Adres email jest nieprawidłowy');
    }
    if (password.trim().length < 6) {
      newErrors.push('Hasło musi zawierać przynajmniej 6 znaków');
    }
    if (!/^[^\s]*$/.test(password.trim())) {
      newErrors.push('Hasło nie może zawierać przerw');
    }
    if (!/[0-9*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password.trim())) {
      newErrors.push('Hasło musi zawierać przynajmniej jedną cyfrę');
    }
    if (password !== confirm) {
      newErrors.push('Hasła nie są identyczne');
    }

    if (newErrors.length > 0) {
      props.setErrors(newErrors);
    } else {
      props.setErrors([]);

      axios.post('http://localhost:8001/user/signup/', {
        login,
        email,
        password
      })
        .then(() => { navigate('../user/login') })
        .catch(err => console.error(err));
    }
  }

  return (
    <div className="formAdd">
      <h2>Dodaj użytkownika</h2>
      <div className="errors" style={{ display: props.errors.length > 0 ? 'block' : 'none' }}>
        <ul>
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={addUser}>
        <label htmlFor="login">Imię i Nazwisko</label>
        <input type="text" name="login" id="login" />
        <label htmlFor="email">Adres email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Hasło</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirm">Powtórz Hasło</label>
        <input type="password" name="confirm" id="confirm" />
        <button type="submit" className="addBtn">Dodaj</button>
      </form>

    </div>
  )
}

export default SignUp;