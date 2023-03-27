import { Route, Routes } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './components/common/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';


function App() {
  
  return (
    <div className="App">

    <AuthProvider >
        <Header />
        <BookProvider>
            <Routes>
                <Route path='/' element={<BookList />} />
                <Route path='/users/login' element={<Login />} />
                <Route path='/users/register' element={<Register />} />
                <Route path='/books/:bookId' element={<BookDetails />} />

                <Route element={<PrivateRoute />}>
                    <Route path="/books/:bookId/edit" element={<EditBook />} />
                    <Route path='/books/create' element={<CreateBook />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/users/logout' element={<Logout />} />
                </Route>
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </BookProvider>
        <Footer />
    </AuthProvider>

</div >
  );
}

export default App;
