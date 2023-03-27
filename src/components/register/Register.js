import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import * as authService from "../../services/authService";

import styles from './Register.module.css';

export const Register = () => {
    const { userLogin } = useContext(AuthContext);
    const [data, setData] = useState({
        email: '',
        password: '',
        confirm: '',
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

        const { email, password, confirm } = Object.fromEntries(new FormData(e.target));

        if (email === '' || password === '' || confirm === '') {
            return alert('All fields are required!');
        }

        if(password !== confirm){
            return alert('Passwords do\'t match!');
        }

        try {
            authService.register(email, password)
                .then(userData => {
                    userLogin(userData);
                    navigate('/');
                })
                .catch((error) => alert(error.message));
        } catch(error) {
            throw new Error(error.message);
        }
    }

    return (
        <section className={styles.auth}>
            <form id="register" onSubmit={onSubmit}>
                <div className={styles.container}>

                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email@abv.bg" value={data.email} onChange={(e) => onChange(e)} />
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" placeholder="********" value={data.password} onChange={(e) => onChange(e)}/>
                    <label htmlFor="confirm-pass">Confirm Password:</label>
                    <input type="password" id="confirm" name="confirm" placeholder="********" value={data.confirm} onChange={(e) => onChange(e)}/>

                    <div className={styles.error}>Error</div>
                    
                    <input type="submit" className={styles["btn-submit"]} value="Register" />
                    <p className={styles.field}>
                        <span>
                            If you don't have profile click <Link to="/users/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
};


