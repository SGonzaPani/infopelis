import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavoritos.js";
import styles from "./MoviePage.module.css";

export default function MoviePage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const movie = state?.movie;
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((f) => f.id === movie?.id);

  if (!movie) {
    return (
      <div className={styles.error}>
        <p>No se encontró la película.</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
           Volver
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
         Volver
      </button>

      <img
        className={styles.poster}
        src={
          movie.posterURL ||
          movie.poster ||
          movie.imageURL ||
          "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.title}
      />

      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>

        <button
          className={styles.favBtn}
          onClick={() =>
            isFavorite ? removeFavorite(movie.id) : addFavorite(movie)
          }
        >
          {isFavorite ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
        </button>

        <p><strong>Año:</strong> {movie.year || "No disponible"}</p>
        <p><strong>Director:</strong> {movie.director || "No disponible"}</p>
        <p><strong>Género:</strong> {movie.genre || "No disponible"}</p>

        {movie.youtubeTrailerId || movie.trailerURL ? (
          <div className={styles.trailerContainer}>
            <iframe
              className={styles.trailer}
              src={
                movie.youtubeTrailerId
                  ? `https://www.youtube.com/embed/${movie.youtubeTrailerId}`
                  : movie.trailerURL
              }
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No hay trailer disponible.</p>
        )}
      </div>
    </div>
  );
}
