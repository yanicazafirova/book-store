import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

import styles from './Login.module.css';

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
                console.log(error.message);
                throw new Error(error.message);
            }
        }
    };

    return (
        <section className={styles.auth}>
            <div className={styles.center}>
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <div className={styles["txt_field"]}>
                        <input type="email" name="email" required value={data.email} onChange={(e) => onChange(e)}/>
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className={styles["txt_field"]}>
                        <input type="password" name="password" required value={data.password} onChange={(e) => onChange(e)}/>
                        <span></span>
                        <label>Password</label>
                    </div>

                    <input type="submit" value="Login" />
                    <div className={styles["signup_link"]}>
                        If you don't have profile click <Link to="/users/register">here</Link>
                    </div>
                </form>
            </div>
        </section>
    );
}


