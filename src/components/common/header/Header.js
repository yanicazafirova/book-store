import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1 >
                <Link to="/" className={styles.title}>Book Store</Link>
            </h1>
            <nav className={styles.navbar}>
                <div id="user" className={styles.user}>
                    <Link to="/favourites">Your Favourites</Link>
                    <Link to="/books/create">Create Book</Link>
                    <Link to="/users/logout">Logout</Link>
                </div>
                <div id="guest" className={styles.guest} >
                    <Link to="/users/login">Login</Link>
                    <Link to="/users/register">Register</Link>
                </div>
            </nav>
        </header>
    );
};
