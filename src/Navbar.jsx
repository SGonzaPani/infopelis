import React from "react";
import styles from "./Navbar.module.css";

function Navbar({ categories, setSearch }) {
 
  const scrollToCategory = (cat) => {
    const el = document.getElementById(cat);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🎬 Info Movies</div>

      <ul className={styles.menu}>
        <li onClick={() => scrollToCategory("favorites")}>Favoritos</li>
        {categories.map((cat) => (
          <li key={cat} onClick={() => scrollToCategory(cat)}>
            {cat}
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <input
          type="text"
          placeholder="Buscar..."
          className={styles.search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className={styles.profile}>👤</span>
      </div>
    </nav>
  );
}

export default Navbar;
