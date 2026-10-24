import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { CATEGORIES } from "../data/products.js";

export default function Navbar({
  query,
  onSearch,
  category,
  onCategoryChange,
  onCartClick,
  onLogoClick,
}) {
  const { count } = useCart();
  // Local state so typing feels instant; we send it up on submit.
  const [text, setText] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text.trim());
  };

  return (
    <header className="navbar">
      <button className="logo" onClick={onLogoClick} aria-label="Home">
        shop<span>easy</span>
        <small>.in</small>
      </button>

      <div className="deliver">
        <small>Deliver to</small>
        <strong>📍 India</strong>
      </div>

      <form className="search" onSubmit={handleSubmit}>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Search category"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search ShopEasy"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onSearch(e.target.value.trim()); // live search while typing
          }}
        />
        <button type="submit" aria-label="Search">
          🔍
        </button>
      </form>

      <div className="nav-item">
        <small>Hello, Learner</small>
        <strong>Account &amp; Lists</strong>
      </div>

      <button className="cart-btn" onClick={onCartClick}>
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{count}</span>
        <strong>Cart</strong>
      </button>
    </header>
  );
}
