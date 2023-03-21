import { useState, useEffect } from 'react';

import * as bookService from '../../services/bookService';
import { Book } from './book/Book';

import styles from './BookList.module.css';


export const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        bookService.getAll()
            .then(result => {
                console.log(result);
                setBooks(result);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles["book-list"]}>

            {books.map((book) => (
                <div key={book.id} className={styles["book-item"]}>
                    <Book  {...book} />
                </div>
            )
            )}
        </div>
    );
};