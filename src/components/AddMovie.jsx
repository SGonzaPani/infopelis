import React, { useState } from "react";
import { useCustomMovies } from "../hooks/useCustomMovies";
import styles from "./AddMovie.module.css";

export default function AddMovie() {
  const { addMovie } = useCustomMovies();

  const [form, setForm] = useState({
    title: "",
    posterURL: "",
    trailerURL: "",
    year: "",
    genre: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMovie({
      id: Date.now(),
      ...form
    });

    alert("Película agregada correctamente 🎬✨");

    setForm({
      title: "",
      posterURL: "",
      trailerURL: "",
      year: "",
      genre: "",
      description: ""
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Agregar nueva película</h2>

        <input
          name="title"
          placeholder="Título"
          required
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="posterURL"
          placeholder="URL del póster"
          value={form.posterURL}
          onChange={handleChange}
        />

        <input
          name="trailerURL"
          placeholder="URL del trailer (YouTube)"
          value={form.trailerURL}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Año"
          value={form.year}
          onChange={handleChange}
        />

        <input
          name="genre"
          placeholder="Género"
          value={form.genre}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Guardar película</button>
      </form>
    </div>
  );
}
