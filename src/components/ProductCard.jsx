import Rating from "./Rating.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice, discountPercent } from "../utils.js";

export default function ProductCard({ product, onOpen, onAdded }) {
  const { addToCart } = useCart();
  const out = product.stock === 0;

  const handleAdd = (e) => {
    e.stopPropagation(); // don't open the modal when clicking the button
    addToCart(product, 1);
    onAdded(product);
  };

  return (
    <article className="card" onClick={() => onOpen(product)}>
      <div className="card-img" style={{ background: product.bg }}>
        <span>{product.emoji}</span>
        {discountPercent(product.price, product.mrp) >= 40 && (
          <em className="badge">Deal</em>
        )}
      </div>

      <h3 className="card-title">{product.title}</h3>
      <Rating value={product.rating} reviews={product.reviews} />

      <div className="price-row">
        <span className="price">{formatPrice(product.price)}</span>
        <span className="mrp">{formatPrice(product.mrp)}</span>
        <span className="off">
          ({discountPercent(product.price, product.mrp)}% off)
        </span>
      </div>

      {product.prime && <div className="prime">✔ prime · Free delivery</div>}

      {out ? (
        <p className="out">Currently unavailable</p>
      ) : product.stock <= 7 ? (
        <p className="low">Only {product.stock} left in stock</p>
      ) : null}

      <button className="btn-yellow" disabled={out} onClick={handleAdd}>
        {out ? "Out of stock" : "Add to Cart"}
      </button>
    </article>
  );
}
