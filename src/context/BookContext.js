import { createContext, useReducer, useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import * as bookService from '../services/bookService';
import { AuthContext } from "./AuthContext";

export const BookContext = createContext();

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'GET_BOOKS':
            if (action.payload) {
                return action.payload.map(x => ({ ...x, favorites: [] }))
            }
            return [...state];
        case 'ADD_BOOK':
            return [...state, action.payload];
        case 'GET_BOOK_DETAILS':
        case 'EDIT_BOOK':
            return state.map(x => x._id === action.bookId ? action.payload : x);
        case 'REMOVE_BOOK':
            return state.filter(x => x._id !== action.bookId);
        default:
            return state;
    }
};

export const BookProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [books, dispatch] = useReducer(bookReducer, []);

    useEffect(() => {
        bookService.getAll()
            .then(result => {
                console.log(result);
                const action = {
                    type: 'GET_BOOKS',
                    payload: result
                };

                dispatch(action);
            });
    }, []);

    const selectBook = (bookId) => {
        return books.find(x => x._id === bookId) || {};
    };

    const getBookDetails = (bookId, bookDetails) => {
        dispatch({
            type: 'GET_BOOK_DETAILS',
            payload: bookDetails,
            bookId,
        })
    }

    const addBook = (bookData) => {
        dispatch({
            type: 'ADD_BOOK',
            payload: bookData,
        })

        navigate('/');
    };

    const editBook = (bookId, bookData) => {
        dispatch({
            type: 'EDIT_BOOK',
            payload: bookData,
            bookId,
        });
    };

    const removeBook = (bookId) => {
        dispatch({
            type: 'REMOVE_BOOK',
            bookId
        })
    }
    return (
        <BookContext.Provider value={{
            books,
            addBook,
            getBookDetails,
            editBook,
            removeBook,
            selectBook,
        }}>
            {children}
        </BookContext.Provider>
    );
}
