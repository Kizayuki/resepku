import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Favorites from './components/Favorites';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './admin/Dashboard';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;