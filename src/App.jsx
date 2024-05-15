import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminSignin from './pages/AdminSignin';
import { useNavigate } from 'react-router-dom';
import RouteLink from './pages/Dashboard/RouteLink';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminSignin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard/*" element={<RouteLink />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  let navigate = useNavigate();  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img src="/src/assets/404.jpg" alt="Not Found" className="w-1/2 max-w-md" />
      <h1 className="text-3xl font-bold text-[rgb(110,38,14)] mt-5">404 Not Found</h1>
      <p className="mt-2 text-lg text-gray-600">The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-5 bg-[rgb(110,38,14)] text-white px-6 py-3 rounded shadow hover:bg-[rgb(120,48,24)] transition-colors"
      >
        Go Home
      </button>
    </div>
  );
}

export default App;
