import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import StartPage from './components/Page/StartPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home/Home';
import Gallery from './components/Page/Gallery';
import { AuthProvider, useAuth } from './authContext/Context';
import PublicView from './components/Public/PublicView';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();
  if (userLoggedIn === undefined) {
    return null; // or a loading indicator
  }
  return userLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<StartPage/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/gallery' element={<Gallery/>} />
          <Route path='/shared/:userId/:imageId' element={<PublicView />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
