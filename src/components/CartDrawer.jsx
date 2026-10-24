import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils.js";

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { items, count, subtotal, setQty, removeFromCart, clearCart } = useCart();

  return (
    <>
      <div className={open ? "backdrop show" : "backdrop"} onClick={onClose} />
      <aside className={open ? "drawer open" : "drawer"} aria-hidden={!open}>
        <div className="drawer-head">
          <h2>Cart</h2>
          <button className="close-plain" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty small">
            <div className="big-emoji">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add something Tadka into it!</p>
          </div>
        ) : (
          <>
            <div className="drawer-list">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-thumb" style={{ background: item.bg }}>
                    {item.emoji}
                  </div>
                  <div className="cart-info">
                    <h4>{item.title}</h4>
                    <strong>{formatPrice(item.price)}</strong>
                    <div className="qty-ctrl">
                      <button onClick={() => setQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        disabled={item.qty >= item.stock}
                      >
                        +
                      </button>
                      <button className="link" onClick={() => removeFromCart(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="link clear" onClick={clearCart}>
                Clear cart
              </button>
            </div>

            <div className="drawer-foot">
              <p>
                Subtotal ({count} item{count !== 1 && "s"}):{" "}
                <strong>{formatPrice(subtotal)}</strong>
              </p>
              <button className="btn-yellow" onClick={onCheckout}>
                Proceed to Buy
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
