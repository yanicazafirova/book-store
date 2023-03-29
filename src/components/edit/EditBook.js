import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookContext } from '../../contexts/BookContext';

import * as bookService from '../../services/bookService';

import styles from './EditBook.module.css';

export const EditBook = () => {
    const { editBook } = useContext(BookContext);
    const [book, setBook] = useState({});
    const { bookId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {
                console.log(result);
                setBook(result);
            })
            .catch((error) => alert(error.message));
    }, [bookId]);

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

        bookService.edit(bookId, bookData)
            .then(result => {
                editBook(bookId, result);
                navigate(`/books/${bookId}`);
            })
            .catch(error => alert(error.message));

    };

    return (
        <section id="edit-page" className={styles.auth}>
            <div className={styles.center}>
                <h1>Edit book</h1>
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
                    <input type="submit" value="Edit" />
                </form>
            </div>

        </section>
    );
}