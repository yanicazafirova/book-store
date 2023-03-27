import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
    return (
        <section className={styles["not-found"]}>
            <div className={styles.container}>
                <h1 className={styles.h1}>404</h1>
                <p>Oops! The page you're looking for cannot be found.</p>
                <p>Let's go <Link to="/">home</Link> and try from there.</p>
            </div>
        </section>
    );
};