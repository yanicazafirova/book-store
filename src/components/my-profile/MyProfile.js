import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { BookContext } from '../../contexts/BookContext';

import { Book } from '../home/book/Book';

import styles from '../home/BookList.module.css';

export const MyProfile = () => {
    const { books } = useContext(BookContext);
    const { user } = useContext(AuthContext);

    const myBooks = books.filter(book => book._ownerId === user._id);

    return (

        <div className={styles["book-list"]} >

            {myBooks?.length > 0 ?
                myBooks.map(book => (
                    <li key={book._id} className={styles["book-item"]}>
                         <Book {...book} />
                    </li>))
                : <h3 className={styles["no-articles"]}>No books yet</h3>
            }
        </div>
    );
};