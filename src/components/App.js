import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { getAPIHealth } from '../axios-services';
import Login from './Login';
import SignUp from './Register';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
      <header> 
      <h1>Welcome to Git Baked! Your online bakery.</h1>
      <h2> Home </h2>
      <p>API Status: {APIHealth}</p>
      <div className='links'>
      <Link to='/login'> Login </Link>
      <Link to='/register'> Register </Link>
      <Link to='/products'> Products </Link>
      </div>

      </header>
    
      <Routes>
        <Route path="/"/>
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<SignUp/>} />
        <Route path="/products" element={<h2> Products </h2>} />
      </Routes>
    </div>
  );
};

export default App;
