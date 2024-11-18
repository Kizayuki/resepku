import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Favorites from './components/Favorites';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Dashboard';

const AppContent = () => {
  const location = useLocation();
  const isDashboardAdmin = location.pathname === '/admin-dashboard';

  return (
    <>
      {!isDashboardAdmin && (
        <>
          <NavBar />
          <Header />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      {!isDashboardAdmin && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;