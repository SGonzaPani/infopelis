import React from 'react'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🎬 Info Movies</div>
      <ul className={styles.menu}>
        <li>Catálogo</li>
        <li>Peliculas</li>
        <li>Series</li>
        <li>Favoritos</li>
        <li>Nosotros</li>
      </ul>
      <div className={styles.actions}>
        <input type="text" placeholder="Buscar..." className={styles.search}/>
        <span className={styles.profile}>👤</span>
      </div>
    </nav>
  )
}

export default Navbar
