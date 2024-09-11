import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPag';
import CartasPag from './pages/cartasPag';  

function App() {
  const isAuthenticated = localStorage.getItem('token');  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />  
        <Route path="/login" element={<LoginPage />} />
        {isAuthenticated && (  
          <>
            <Route path="/cartas" element={<CartasPag />} />  
          </>
        )}
        <Route path="*" element={<Navigate to="/login" />} />  
      </Routes>
    </Router>
  );
}

export default App;