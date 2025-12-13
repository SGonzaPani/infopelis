import { Routes, Route } from "react-router-dom";

import CategorySection from "../components/CategorySection.jsx";
import MoviePage from "../components/MoviePage.jsx";
import AddMovie from "../components/AddMovie.jsx";
import Footer from "../components/Footer.jsx";
import Login from "../pages/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import styles from "../App.module.css";

export default function AppRouter({ categories, search, username }) {
  return (
    <Routes>

      {/* home protegido */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <>
              <section id="home" className={styles.home}>
                <h2 className={styles.welcome}>
                  Bienvenido a Info Movies, {username}! 🍿
                </h2>
              </section>

              {/* Favoritos */}
              <CategorySection category="favorites" search={search} />

              {/* trailers/custom */}
              <CategorySection category="custom" search={search} />

              {/* Categorias normales */}
              {categories.map((cat) => (
                <CategorySection
                  key={cat}
                  category={cat}
                  search={search}
                />
              ))}

              <Footer />
            </>
          </ProtectedRoute>
        }
      />

      {/* Pagina de pelis */}
      <Route 
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        }
      />

      {/* Agregar pelis */}
      <Route 
        path="/addmovie"
        element={
          <ProtectedRoute>
            <AddMovie />
          </ProtectedRoute>
        }
      />

      {/* Login */}
      <Route path="/login" element={<Login />} />
      
    </Routes>
  );
}
