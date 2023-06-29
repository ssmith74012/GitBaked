import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import "../style/App.css";

const App = () => {
  const [authToken, setAuthToken] = useState(
    window.localStorage.getItem("st-token")
  );
  const DB_NAME = "Git-Baked";
  const DB_URL =
    process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

  // useEffect(() => {
  // follow this pattern inside your useEffect calls:
  // first, create an async function that will wrap your axios service adapter
  // invoke the adapter, await the response, and set the data
  // const getAPIStatus = async () => {
  //   const { healthy } = await getAPIHealth();
  //   setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
  // };

  // second, after you've defined your getter above
  // invoke it immediately after its declaration, inside the useEffect callback
  //   getAPIStatus();
  // }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Welcome to Git Baked! Your online bakery.</h1>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link-one" to="/products">
            Products
          </Link>
          <Link className="link-two" to="/login">
            Login
          </Link>
          <Link className="link-three" to="/register">
            Register
          </Link>
        </div>
      </header>

      <Routes>
        <Route index element={<Home DB_URL={DB_URL} authToken={authToken} />} />
        <Route path="login" element={<Login />} />
        <Route
          path="register"
          element={
            <Register
              authToken={authToken}
              setAuthToken={setAuthToken}
              DB_URL={DB_URL}
            />
          }
        />
        <Route path="products" element={<h2> Products </h2>} />
      </Routes>

      <footer className="footer">
        <ul>
          <h3>Products</h3>
          <Link>
            <li>All</li>
          </Link>
          <Link>
            <li>Bagels</li>
          </Link>
          <Link>
            <li>Cakes</li>
          </Link>
          <Link>
            <li>Cookies</li>
          </Link>
          <Link>
            <li>Pies</li>
          </Link>
        </ul>

        <ul>
          <h3>Recipes</h3>
          <Link>
            <li>Breakfast</li>
          </Link>
          <Link>
            <li>Lunch</li>
          </Link>
          <Link>
            <li>Dinner</li>
          </Link>
          <Link>
            <li>Dessert</li>
          </Link>
        </ul>

        <ul>
          <h3>About Us</h3>
          <Link>
            <li>Careers</li>
          </Link>
          <Link>
            <li>Blog</li>
          </Link>
          <Link>
            <li>Our History</li>
          </Link>
          <Link>
            <li>Contact Us</li>
          </Link>
        </ul>
      </footer>
    </div>
  );
};

export default App;
