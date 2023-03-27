import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BookContext } from '../../contexts/BookContext';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './BookDetails.module.css';

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
                console.log(bookData);
                setBook(bookData);
            });
    }, []);

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
        <section className={styles["book-details"]}>
            <h1 className={styles.title}>Book Details</h1>
            <div className={styles.container}>
                <div className={styles.column1}>
                    <img className={styles.img} src={book.imageUrl} alt={book.title} />
                    {user._id === book._ownerId ?
                        <div className={styles.buttons}>
                            <Link to={`/books/${book._id}/edit`} className={styles.button}>Edit</Link>
                            <Link to="#" className={styles.button} onClick={deleteHandler}>Delete</Link>
                        </div>
                        : null
                    }
                </div>
                <div className={styles.column2}>
                    <h1 className={styles.title}>Title: {book.title}</h1>
                    <span className={styles["author"]}>Author: {book.author}</span>
                    <p className={styles.type}>Genre: {book.genre}</p>
                    <p className={styles.text}>
                        Description: {book.description}
                    </p>

                </div>

            </div>
        </section>
    );
};

