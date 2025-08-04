import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LaundryApp from './components/LaundryApp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<LaundryApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
