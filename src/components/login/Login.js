import { Link } from 'react-router-dom';
import styles from './Login.module.css';

import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';

export const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
   
    const navigate = useNavigate();

    const onChange = (e) => {
        setData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.target));

        if (email === '' || password === '') {
            return alert('All fields are required!');
        } else {
            try {
                authService.login(email, password)
                    .then(userData => {
                        userLogin(userData);
                        navigate('/');
                    })
                    .catch((error) => alert(error.message));
            } catch (error) {
               
                alert(error.message);
            }
        }
    };

    return (
        <section className={styles.auth}>
            <form id="login" onSubmit={onSubmit}>
                <div className={styles.container}>

                    <h1>Login</h1>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email@abv.bg" value={data.email} onChange={(e) => onChange(e)} />
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" placeholder="********" value={data.password} onChange={(e) => onChange(e)} />

                    <input type="submit" className={styles["btn-submit"]} value="Login" />
                    <p className={styles.field}>
                        <span>
                            If you don't have profile click <Link to="/users/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
};