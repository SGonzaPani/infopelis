import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar({ categories, setSearch }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
  };

  const goHome = () => {
    if (!username) return navigate("/login");

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const scrollToCategory = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const sec = document.getElementById(id);
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      }, 350);
      return;
    }

    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={goHome}>
        🎬 Info Movies
      </div>

      <ul className={styles.menu}>
        <li onClick={() => scrollToCategory("favorites")}>Favoritos</li>

        {categories.map((cat) => (
          <li key={cat} onClick={() => scrollToCategory(cat)}>
            {cat}
          </li>
        ))}

        <li onClick={() => scrollToCategory("custom")}>Trailers</li>

        {!username ? (
          <li onClick={() => navigate("/login")}>Login</li>
        ) : (
          <li onClick={handleLogout}>Cerrar sesión</li>
        )}
      </ul>

      <div className={styles.actions}>
        <input
          type="text"
          placeholder="Buscar..."
          className={styles.search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className={styles.profile}>
          {username ? `Hola, ${username} 👤` : "👤"}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
