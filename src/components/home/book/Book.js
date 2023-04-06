import { Link } from "react-router-dom";

export const Book = (book) => {

    return (

        <div>
            <h4>{book.title}</h4>
            <div>
                <Link to={`/books/${book._id}`}><img src={book.imageUrl} alt={book.title} /></Link>
            </div>
        </div>

    );
};