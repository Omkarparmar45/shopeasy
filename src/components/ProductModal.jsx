import { useEffect, useState } from "react";
import Rating from "./Rating.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice, discountPercent } from "../utils.js";

export default function ProductModal({ product, onClose, onAdded, onBuyNow }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const out = product.stock === 0;

  // Close on Escape key.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const add = () => {
    addToCart(product, qty);
    onAdded(product);
    onClose();
  };

  const buyNow = () => {
    addToCart(product, qty);
    onBuyNow();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal-img" style={{ background: product.bg }}>
          {product.emoji}
        </div>

        <div className="modal-info">
          <span className="cat-tag">{product.category}</span>
          <h2>{product.title}</h2>
          <Rating value={product.rating} reviews={product.reviews} />
          <hr />

          <div className="price-row big">
            <span className="off-big">-{discountPercent(product.price, product.mrp)}%</span>
            <span className="price">{formatPrice(product.price)}</span>
          </div>
          <p className="mrp-line">
            M.R.P.: <span className="mrp">{formatPrice(product.mrp)}</span>
          </p>
          {product.prime && <div className="prime">✔ prime · FREE delivery tomorrow</div>}

          <p className="desc">{product.description}</p>

          {out ? (
            <p className="out big">Currently unavailable.</p>
          ) : (
            <>
              <p className="instock">In stock</p>
              <label className="qty-select">
                Quantity:
                <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                  {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </label>
              <div className="modal-actions">
                <button className="btn-yellow" onClick={add}>
                  Add to Cart
                </button>
                <button className="btn-orange" onClick={buyNow}>
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
