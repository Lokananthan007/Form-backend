import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Table from './components/Table';
import Update from './components/Update';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/update/:userIds" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
