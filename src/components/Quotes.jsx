// src/components/Quotes.jsx
import React, { useState } from "react";
import quotesData from "../data/quotes.json";
import QuoteCard from "./QuoteCard";
import "./Quotes.css";

const Quotes = ({ user, onLogout }) => {
  const [likedQuotes, setLikedQuotes] = useState(() =>
    JSON.parse(localStorage.getItem("likedQuotes") || "[]")
  );

  const toggleLike = (id) => {
    const updated = likedQuotes.includes(id)
      ? likedQuotes.filter((q) => q !== id)
      : [...likedQuotes, id];
    setLikedQuotes(updated);
    localStorage.setItem("likedQuotes", JSON.stringify(updated));
  };

  return (
    <div className="quotes-container">
      <div className="header-bar">
        <h2>Your Daily Motivation</h2>
        {onLogout && (
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
      {quotesData.map((quote) => (
        <QuoteCard
          key={quote.id}
          quote={quote}
          liked={likedQuotes.includes(quote.id)}
          onLike={toggleLike}
        />
      ))}
    </div>
  );
};

export default Quotes;