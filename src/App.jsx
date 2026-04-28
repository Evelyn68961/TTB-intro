import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WhatIsTTB from './pages/WhatIsTTB';
import Methodology from './pages/Methodology';
import Applications from './pages/Applications';
import Demo from './pages/Demo';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/what-is-ttb" element={<WhatIsTTB />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;