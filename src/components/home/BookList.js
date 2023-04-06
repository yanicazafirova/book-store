import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { BookContext } from '../../contexts/BookContext';

import { Book } from './book/Book';

import styles from './BookList.module.css';

export const BookList = () => {
    const { books } = useContext(BookContext);
    const { user } = useContext(AuthContext);
    const [query, setQuery] = useState('');

    return (
        <>
            {user.email ?
                <div className={styles.search}>
                    <form className={styles.form}>
                        <input className={styles.searchInput} type="text" placeholder="Search..." name='title' onChange={(e) => setQuery(e.target.value)} />
                    </form>
                </div>
                : null
            }

            <div className={styles["book-list"]} >

                {books?.length > 0 ?
                    books.filter(book => book.title.toLowerCase().includes(query)).length > 0
                        ?
                        books.filter(book => book.title.toLowerCase().includes(query)).map(book => (
                            <div key={book._id} className={styles["book-item"]}>
                                <Book {...book} />
                            </div>))
                        : <h3 className={styles["no-articles"]}>The book is not found!</h3>
                    : <h3 className={styles["no-articles"]}>No books yet</h3>
                }
            </div>
        </>
    );
};