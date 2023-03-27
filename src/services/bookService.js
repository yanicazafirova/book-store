import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/books';

export const getAll = () => request.get(baseUrl);

export const getOne = (bookId) => request.get(`${baseUrl}/${bookId}`);

export const create = (bookData) => request.post(baseUrl, bookData);

export const edit = (bookId, bookData) => request.put(`${baseUrl}/${bookId}`, bookData);

export const remove = (bookId) => request.del(`${baseUrl}/${bookId}`);
