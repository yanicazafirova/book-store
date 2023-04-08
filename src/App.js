import './App.css';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';

import { PrivateRoute } from "./components/common/PrivateRoute";

import { BookList } from './components/home/BookList';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { Header } from './components/common/header/Header';
import { Footer } from './components/common/footer/Footer';
import { CreateBook } from './components/create/CreateBook';
import { NotFound } from './components/not-found/NotFound';
import { Logout } from './components/logout/Logout';
import { BookDetails } from './components/details/BookDetails';
import { EditBook } from './components/edit/EditBook';
import { MyProfile } from './components/my-profile/MyProfile';

//All book data which is rendering is in assets folder

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
                            <Route path='/books/my-profile' element={<MyProfile />} />
                            <Route path='/books/create' element={<CreateBook />} />
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
