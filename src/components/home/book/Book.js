export const Book = (book) => {

    return (
        <>
            <div>
                <h4>{book.title}</h4>
            </div>
            <div>
                <img src={book.image_url} alt={book.title} />
            </div>
            <div>
                <button>Add to Favourites</button>
            </div>
        </>
    );
};