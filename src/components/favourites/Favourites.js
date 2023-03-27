import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Favorite.module.css';


export const Favorites = () => {
    const { user } = useContext(AuthContext);
    
    return (
        <div className={styles.favorites}> Favorites </div>
        //     {favorites.map(book => (
        //         <div key={book._id} className={styles["book-item"]}>
        //             <div>
        //                 <h4>{book.title}</h4>
        //             </div>
        //             <div>
        //                 <img src={book.imageUrl} alt={book.title} />
        //             </div>
        //             {user.email && user._id !== book._ownerId ?
        //                 <div>
        //                     <button>Remove From Favorites</button>
        //                 </div>
        //                 : null
        //             }
        //         </div>
        //     )
        //     )}
        // </div >
    );
};