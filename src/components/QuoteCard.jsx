// src/components/QuoteCard.jsx
import React from "react";
import "./QuoteCard.css";

const QuoteCard = ({ quote, liked, onLike }) => {
  return (
    <div className="quote-card">
      <p className="quote-text">"{quote.text}"</p>
      <span className="quote-author">- {quote.author}</span>
      <button className="like-button" onClick={() => onLike(quote.id)}>
        {liked ? "💔 Unlike" : "❤️ Like"}
      </button>
    </div>
  );
};

export default QuoteCard;