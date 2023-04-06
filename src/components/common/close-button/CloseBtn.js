import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './CloseBtn.module.css';

export const CloseBtn = ({ book }) => {
    const [close, setClose] = useState(false);
    const navigate = useNavigate();
    const pathname = window.location.pathname;

    const onClick = () => {
        setClose(true);
        if (pathname === '/books/create') {
            navigate("/");
        } else {
            navigate(`/books/${book._id}`);
        }
    }
    return (
        <div className={styles.divBtn}>
            <button className={styles.btn} onClick={() => onClick()}>X</button>
        </div>
    );
}