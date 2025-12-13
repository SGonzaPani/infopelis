import React from "react";
import { useMovies } from "../hooks/useMovies.js";
import { useFavorites } from "../hooks/useFavoritos.js";
import { useCustomMovies } from "../hooks/useCustomMovies.js";
import { Link } from "react-router-dom";

import styles from "./CategorySection.module.css";

export default function CategorySection({ category, search }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { movies: customMovies } = useCustomMovies();

  let movieSource;

  if (category === "favorites") {
    movieSource = { data: favorites, isLoading: false, error: false };
  } else if (category === "custom") {
    movieSource = {
      data: customMovies,
      isLoading: false,
      error: false,
    };
  } else {
    movieSource = useMovies(category);
  }

  const { data: movies, isLoading, error } = movieSource;

  if (isLoading) return <p className={styles.loading}>Cargando {category}...</p>;
  if (error) return <p className={styles.error}>Error cargando {category}</p>;

  const filtered =
    movies?.filter((movie) =>
      (movie.title || "").toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <section id={category} className={styles.section}>
      <h2 className={styles.title}>
       {category === "favorites"
         ? "FAVORITOS"
         : category === "custom"
          ? "TRAILERS"
          : category.toUpperCase()}
      </h2>

      {filtered.length === 0 ? (
        <p className={styles.noResults}>No se encontraron películas.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((movie) => {
            const isFavorite = favorites.some((f) => f.id === movie.id);

            return (
              <div key={movie.id} className={styles.cardWrapper}>
                <button
                  className={styles.favButton}
                  onClick={() =>
                    isFavorite ? removeFavorite(movie.id) : addFavorite(movie)
                  }
                >
                  {isFavorite ? "❤️" : "🤍"}
                </button>

                <Link
                  to={`/movie/${movie.id}`}
                  state={{ movie }}
                  className={styles.card}
                >
                  <img
                    src={
                      movie.posterURL ||
                      movie.poster ||
                      movie.imageURL ||
                      "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
