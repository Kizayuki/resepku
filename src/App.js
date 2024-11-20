import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DataUser from './pages/DataUser';
import History from './pages/History';

const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname === '/';
  const hideNavbar = ['/dashboard', '/data-user', '/history'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <NavBar />}
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/data-user" element={<DataUser />} />
        <Route path="/history" element={<History />} />
      </Routes>
      {!hideNavbar && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;