import { useContext, useState } from 'react';

import { BookContext } from '../../contexts/BookContext';
import * as bookService from '../../services/bookService';

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
        if(bookData.title.length < 5){
            return alert('Book title should be at least 5 characters!');
        }else if(bookData.genre.length < 3){
            return alert('Genre should be at least 3 characters!');
        }else if(bookData.author.length < 4){
            return alert('Author should be at least 4 characters!');
        }else if(!bookData.imageUrl.startsWith('http')){
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

            <form id="create" onSubmit={onSubmit}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Create Book</h1>

                    <label htmlFor="book-title">Book title:</label>
                    <input
                        value={book.title}
                        onChange={onChange}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter book title..."
                    />
                    <label htmlFor="category">Genre:</label>
                    <input
                        value={book.genre}
                        onChange={onChange}
                        type="text"
                        id="genre"
                        name="genre"
                        placeholder="Enter book genre..."
                    />
                    <label htmlFor="author">Author:</label>
                    <input
                        value={book.author}
                        onChange={onChange}
                        type="text"
                        id="author"
                        name="author"
                        placeholder="William Styron"
                    />

                    <label htmlFor="book-img">Image:</label>

                    <input
                        value={book.imageUrl}
                        onChange={onChange}
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                    />

                    <label htmlFor="description">Book description:</label>

                    <textarea
                        name="description"
                        id="description"
                        value={book.description}
                        onChange={onChange}
                    />

                    <input
                        className={styles["btn-submit"]}
                        type="submit"
                        value="Create Book"
                    />
                </div>
            </form>
        </section>
    );
};

