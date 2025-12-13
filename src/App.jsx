import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import AppRouter from "./router/AppRouter.jsx";
import styles from "./App.module.css";

export default function App() {
  const [search, setSearch] = useState("");
  const username = localStorage.getItem("username");
  const [customMovies, setCustomMovies] = useState([]);

  const addMovie = (movie) => {
    setCustomMovies((prev) => [...prev, movie]);
  };

  const categories = ["drama", "animation", "comedy"];

  return (
    <div className={styles.app}>
      <Navbar 
        categories={categories} 
        setSearch={setSearch} 
        username={username} 
      />

      <AppRouter
        categories={categories}
        search={search}
        username={username}
        customMovies={customMovies}
        addMovie={addMovie}
      />
    </div>
  );
}
