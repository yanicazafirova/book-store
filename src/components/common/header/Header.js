import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

import styles from './Header.module.css';

export const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <h1 className={styles.title} >
                <Link to="/" className={styles.title}>Book Store</Link>
            </h1>
            <nav className={styles.navbar}>
                <h4>{user.email ? `Welcome ${user.email}` : null}</h4>
                {user?.email ?
                    <div id="user" className={styles.user}>
                        <Link to="/books/create">Create Book</Link>
                        <Link to="/users/logout">Logout</Link>
                    </div>
                    :
                    <div id="guest" className={styles.guest} >
                        <Link to="/users/login">Login</Link>
                        <Link to="/users/register">Register</Link>
                    </div>
                }
            </nav>
        </header>
    );
};
