import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStartedPage from './pages/GetStartedPage'; // correct for .js, .jsx, .tsx
import HomePage  from './pages/HomePage';  // or the correct path to HomePage


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
