import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";


export const Book = (book) => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <div>
                <h4>{book.title}</h4>
            </div>
            <div>
                <Link to={`/books/${book._id}`}><img src={book.imageUrl} alt={book.title} /></Link>
            </div>
            {user.email && user._id !== book._ownerId ?
                <div> 
                    <button>Add to Favorites</button>
                </div>
                : null
            }
        </>
    );
};