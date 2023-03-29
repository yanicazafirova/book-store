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

        if (password !== confirm) {
            return alert('Passwords do\'t match!');
        }

        try {
            authService.register(email, password)
                .then(userData => {
                    userLogin(userData);
                    navigate('/');
                })
                .catch((error) => alert(error.message));
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return (
        <section className={styles.auth}>
            <div className={styles.center}>
                <h1>Register</h1>
                <form onSubmit={onSubmit}>
                    <div className={styles["txt_field"]}>
                        <input type="email" name="email" required value={data.email} onChange={(e) => onChange(e)} />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className={styles["txt_field"]}>
                        <input type="password" name="password" required value={data.password} onChange={(e) => onChange(e)} />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className={styles["txt_field"]}>
                        <input type="password" name="confirm" required value={data.confirm} onChange={(e) => onChange(e)} />
                        <span></span>
                        <label>Confirm Password</label>
                    </div>
                    <input type="submit" value="Register" />
                    <div className={styles["signup_link"]}>
                        If you have profile click <Link to="/users/login">here</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};


