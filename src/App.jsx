import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import CategorySection from "./Categorias.jsx";
import styles from "./App.module.css";

function App() {
  const categories = ["drama", "animation", "comedy"];
  const [search, setSearch] = useState("");

  return (
    <div className={styles.app}>
      <Navbar categories={categories} setSearch={setSearch} />


      <CategorySection id="favorites" category="favorites" search={search} />

      {categories.map((cat) => (
        <CategorySection
          key={cat}
          id={cat} 
          category={cat}
          search={search}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
