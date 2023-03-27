import { useContext } from 'react';
import { BookContext } from '../../contexts/BookContext';

import { Book } from './book/Book';

import styles from './BookList.module.css';

export const BookList = () => {
    const { books } = useContext(BookContext);
    
    return (
        <div className={styles["book-list"]}>
            {books.length > 0 ?
                books.map(book => (
                    <div key={book._id} className={styles["book-item"]}>
                        <Book {...book} />
                    </div>))
                : <h3 className="no-articles">No books yet</h3>
            }
        </div>
    );
};