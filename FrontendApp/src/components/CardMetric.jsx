import React from 'react';
import '../styles/cardMetric.css';

function CardMetric({ titulo, valor, color }) {
  return (
    <div className={`card-metric card-${color}`}>
      <h2>{titulo}</h2>
      <p>{valor}</p>
    </div>
  );
}

export default CardMetric;
  
