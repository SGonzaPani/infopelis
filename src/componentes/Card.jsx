import React, { useState } from 'react';
import styles from './card.module.css';


function Card({ image, title, description }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      {description && (
         <p className={styles.description}>
      {showMore
       ? description
       : `${description.substring(0, 80)}...`}
        </p>
      )}
      <button className={styles.button} onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Ver menos' : 'Ver más'}
      </button>
    </div>
  );
}

export default Card; 


