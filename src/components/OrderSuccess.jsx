import { formatPrice } from "../utils.js";

export default function OrderSuccess({ order, onContinue }) {
  return (
    <div className="page-box success">
      <div className="tick">✔</div>
      <h2>Order placed, thank you!</h2>
      <p>
        Hi <strong>{order.name}</strong>, your order <strong>{order.id}</strong> for{" "}
        <strong>{formatPrice(order.total)}</strong> will be delivered to{" "}
        <strong>{order.city}</strong> soon.
      </p>
      <button className="btn-yellow fit" onClick={onContinue}>
        Continue shopping
      </button>
    </div>
  );
}
