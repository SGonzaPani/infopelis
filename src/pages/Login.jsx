import { useState } from "react";
import styles from "./Login.module.css";

export default function Login() {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name.trim()) return;

    localStorage.setItem("username", name);
    window.location.href = "/"; // Redirige inicio
  };

  return (
    <div className={styles.container}>
      <h2>Ingresá tu nombre</h2>

      <input 
        type="text"
        placeholder="Tu nombre..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />

      <button className={styles.button} onClick={handleLogin}>
        Continuar
      </button>
    </div>
  );
}
