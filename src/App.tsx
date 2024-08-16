import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Uploadpage from './pages/Uploadpage';
import logo from './assets/logo.png'; // Import the logo image

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <div className='px-4 bg-white'>
          <nav className="container mx-auto py-4 text-blue flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="It's All About Cats" className="h-24" /> {/* Logo Image */}
            </Link>
            <div className="space-x-4">
              <Link to="/" className="nav-item hover:underline">Home</Link>
              <Link to="/upload" className="nav-item hover:underline">Upload</Link>
            </div>
          </nav>
        </div>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/upload" element={<Uploadpage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;