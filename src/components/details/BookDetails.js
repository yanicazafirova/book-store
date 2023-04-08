import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BookContext } from '../../contexts/BookContext';
import { AuthContext } from '../../contexts/AuthContext';

import * as bookService from '../../services/bookService';

import styles from './BookDetails.module.css';
import icon from '../../assets/arrow-left-solid.svg';
import heart from '../../assets/heart-regular.svg';


export const BookDetails = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const { removeBook, updateBook } = useContext(BookContext);
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState({});
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        bookService.getOne(bookId)
            .then(bookData => {
                setBook(bookData);
            });
    }, [bookId]);

    const onLike = () => {
        if (!book.likes?.includes(user._id)) {
            book.likes?.push(user._id);
            setIsLiked(true);
        }
        if (user.email) {
            bookService.edit(bookId, { likes: book.likes })
                .then(() => updateBook(bookId, { likes: book.likes }))
                .catch(error => {
                    console.log(error);
                });
        }
    }

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
                        <img src={book.imageUrl} alt={book.title} />
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
                        :
                        <div>
                            {!isLiked ? <img src={heart} alt='heart' className={styles.back} onClick={onLike}></img> : <p>You've like this post!</p>}
                        </div>
                    }
                </div>



                <Link to="/"><img src={icon} className={styles.back} /></Link>
            </div>
        </div >
    );
};

