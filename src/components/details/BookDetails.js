import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BookContext } from '../../contexts/BookContext';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './BookDetails.module.css';
import icon from '../../assets/arrow-left-solid.svg';

import * as bookService from '../../services/bookService';

export const BookDetails = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const { removeBook } = useContext(BookContext);
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState({});

    useEffect(() => {
        bookService.getOne(bookId)
            .then(bookData => {
                setBook(bookData);
            });
    }, [bookId]);

    const deleteHandler = () => {
        const confirm = window.confirm(`Are you sure you want to delete this book: ${book.title}?`);

        if (confirm) {
            bookService.remove(bookId)
                .then(() => {
                    removeBook(bookId);
                    navigate('/');
                });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.images}>
                    <div className={styles["img-holder active"]}>
                        <img src={book.imageUrl} alt={book.title}/>
                    </div>
                </div>
                <div className={styles["basic-info"]}>
                    <h2>Title: {book.title}</h2>

                    <h4>Genre: {book.genre}</h4>
                </div>
                <div className={styles.description}>

                    <div><h3>Description:</h3>{book.description}</div>
                    {user._id === book._ownerId ?
                        <div className={styles.buttons}>
                            <Link to={`/books/${book._id}/edit`} className={styles.button}>Edit</Link>
                            <Link to="#" className={styles.button} onClick={deleteHandler}>Delete</Link>
                        </div>
                        : null
                    }
                </div>

                <Link to="/"><img src={icon} className={styles.back} /></Link>
            </div>
        </div>
    );
};

