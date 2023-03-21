import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export const Login = () => {
    return (
        <section className={styles.auth}>
            <form id="login">
                <div className={styles.container}>

                    <h1>Login</h1>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email@abv.bg" />
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" placeholder="********" />

                    <div className={styles.error}>Error</div>

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