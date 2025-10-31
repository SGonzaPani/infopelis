import React from "react";
import Navbar from "./componentes/Navbar.jsx";
import Card from "./componentes/Card.jsx";
import { movies } from "./componentes/movies.js";
import styles from "./App.module.css";
import Container from "./componentes/container.jsx";
import Footer from "./componentes/footer.jsx";

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      {["Peliculas", "Series", "Deportes"].map((category) => (
        <div className={styles.category}>
        <h2>{category}</h2>
    <div className={styles.cardsContainer}>
      {movies
        .filter((movie) => movie.category === category)
        .map((movie) => (
          <Card
            key={movie.id}
            image={movie.image}
            title={movie.title}
            description={movie.description}
          />
        ))}
    </div>
  </div>
))}

      <Footer />
    </div>
  )
}

export default App
