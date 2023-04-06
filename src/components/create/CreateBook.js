import { useContext, useState } from 'react';

import { BookContext } from '../../contexts/BookContext';
import * as bookService from '../../services/bookService';
import { CloseBtn } from '../common/close-button/CloseBtn';

import styles from './CreateBook.module.css';

export const CreateBook = () => {
    const { addBook } = useContext(BookContext);
    const [book, setBook] = useState({
        title: '',
        genre: '',
        author: '',
        imageUrl: '',
        description: '',
    });

    const onChange = (e) => {
        setBook(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const bookData = Object.fromEntries(new FormData(e.target));

        if (bookData.title === '' || bookData.genre === '' || bookData.author === '' || bookData.imageUrl === '' || bookData.description === '') {
            return alert('All fields are required!');
        }
        if (bookData.title.length < 5) {
            return alert('Book title should be at least 5 characters!');
        } else if (bookData.genre.length < 3) {
            return alert('Genre should be at least 3 characters!');
        } else if (bookData.author.length < 4) {
            return alert('Author should be at least 4 characters!');
        } else if (!bookData.imageUrl.startsWith('http')) {
            return alert('Image ulr should starts with http!');
        }

        bookService.create(bookData)
            .then(result => {
                addBook(result);
            })
            .catch(error => alert(error.message));
    };

    return (
        <section id="create-page" className={styles.auth}>
            <div className={styles.center}>
                <CloseBtn />
                <h1>Create book</h1>
                <form onSubmit={onSubmit}>
                    <div className={styles["txt_field"]}>
                        <input type="text" name="title" value={book.title} onChange={onChange} />
                        <span></span>
                        <label>Title</label>
                    </div>
                    <div className={styles["txt_field"]}>
                        <input type="text" name="genre" value={book.genre} onChange={onChange} />
                        <span></span>
                        <label>Genre</label>
                    </div>
                    <div className={styles["txt_field"]}>
                        <input type="text" name="author" value={book.author} onChange={onChange} />
                        <span></span>
                        <label>Author</label>
                    </div>
                    <div className={styles["txt_field"]}>
                        <input type="text" name="imageUrl" value={book.imageUrl} onChange={onChange} />
                        <span></span>
                        <label>Image</label>
                    </div>
                    <div className={styles["txt_field"]}>
                        <input type="text" name="description" value={book.description} onChange={onChange} />
                        <span></span>
                        <label>Description</label>
                    </div>
                    <input type="submit" value="Create" />
                </form>
            </div>
        </section>
    );
};

