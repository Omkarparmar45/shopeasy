import { CATEGORIES } from "../data/products.js";

export default function CategoryBar({ active, onSelect }) {
  return (
    <nav className="category-bar">
      {CATEGORIES.map((c) => (
        <button
          key={c}
          className={c === active ? "active" : ""}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </nav>
  );
}
