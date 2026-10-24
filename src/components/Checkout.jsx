import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils.js";

const EMPTY = { name: "", phone: "", pincode: "", address: "", city: "", payment: "cod" };

// Simple controlled-form validation: returns an object of error messages.
function validate(f) {
  const e = {};
  if (f.name.trim().length < 3) e.name = "Enter your full name";
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit mobile number";
  if (!/^\d{6}$/.test(f.pincode)) e.pincode = "Enter a 6-digit PIN code";
  if (f.address.trim().length < 6) e.address = "Enter your address";
  if (f.city.trim().length < 2) e.city = "Enter your city";
  return e;
}

export default function Checkout({ onBack, onSuccess }) {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const delivery = subtotal >= 499 ? 0 : 40;
  const total = subtotal + delivery;

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const placeOrder = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const orderId = "SE-" + Math.floor(100000 + Math.random() * 900000);
    const order = { id: orderId, total, name: form.name, city: form.city };
    clearCart();
    onSuccess(order);
  };

  if (items.length === 0) {
    return (
      <div className="page-box empty">
        <h2>Nothing to checkout</h2>
        <p>Your cart is empty.</p>
        <button className="btn-yellow fit" onClick={onBack}>
          Continue shopping
        </button>
      </div>
    );
  }

  const field = (name, label, props = {}) => (
    <label className="field">
      <span>{label}</span>
      <input name={name} value={form[name]} onChange={update} {...props} />
      {errors[name] && <small className="err">{errors[name]}</small>}
    </label>
  );

  return (
    <div className="checkout">
      <form className="page-box" onSubmit={placeOrder} noValidate>
        <h2>Checkout</h2>

        <h3>1. Delivery address</h3>
        <div className="form-grid">
          {field("name", "Full name")}
          {field("phone", "Mobile number", { maxLength: 10, inputMode: "numeric" })}
          {field("pincode", "PIN code", { maxLength: 6, inputMode: "numeric" })}
          {field("city", "Town / City")}
        </div>
        {field("address", "Flat, House no., Building, Street")}

        <h3>2. Payment method</h3>
        <div className="pay-options">
          {[
            ["cod", "💵 Cash on Delivery"],
            ["upi", "📱 UPI"],
            ["card", "💳 Credit / Debit card"],
          ].map(([val, label]) => (
            <label key={val} className={form.payment === val ? "pay active" : "pay"}>
              <input
                type="radio"
                name="payment"
                value={val}
                checked={form.payment === val}
                onChange={update}
              />
              {label}
            </label>
          ))}
        </div>
        <p className="hint">This is a demo – no real payment is taken.</p>

        <h3>3. Review items</h3>
        <ul className="review-list">
          {items.map((i) => (
            <li key={i.id}>
              <span>
                {i.emoji} {i.title} × {i.qty}
              </span>
              <strong>{formatPrice(i.price * i.qty)}</strong>
            </li>
          ))}
        </ul>

        <button type="button" className="link" onClick={onBack}>
          ← Back to shopping
        </button>
      </form>

      <aside className="summary page-box">
        <button className="btn-yellow" onClick={placeOrder}>
          Place your order
        </button>
        <h3>Order Summary</h3>
        <div className="sum-row">
          <span>Items:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="sum-row">
          <span>Delivery:</span>
          <span>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span>
        </div>
        <hr />
        <div className="sum-row total">
          <span>Order Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
        {delivery > 0 && (
          <p className="hint">Add items worth {formatPrice(499 - subtotal)} more for free delivery.</p>
        )}
      </aside>
    </div>
  );
}
