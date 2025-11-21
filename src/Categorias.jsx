import React from "react";
import { useMovies } from "./Movies.js";
import { useFavorites } from "./Favoritos.js";
import styles from "./Categorias.module.css";

export default function CategorySection({ category, search }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { data: movies, isLoading, error } =
    category === "favorites"
      ? { data: favorites, isLoading: false, error: false }
      : useMovies(category);

  if (isLoading) return <p>Cargando {category}...</p>;
  if (error) return <p>Error cargando {category}</p>;

  const filtered = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id={category} className={styles.section}>
      <h2 className={styles.title}>{category.toUpperCase()}</h2>

      {(!filtered || filtered.length === 0) ? (
        <p>No se encontraron películas para esta búsqueda.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((movie) => {
            const isFavorite = favorites.some((f) => f.id === movie.id);

            return (
              <div key={movie.id} className={styles.card}>
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

                <button
                  className={styles.favButton}
                  onClick={() =>
                    isFavorite ? removeFavorite(movie.id) : addFavorite(movie)
                  }
                >
                  {isFavorite ? "❤️" : "🤍"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
