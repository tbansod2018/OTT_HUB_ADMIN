// src/App.js

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanal'; // Import AdminPanel

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminPanel />} /> {/* Main route for AdminPanel */}
          {/* You can add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
