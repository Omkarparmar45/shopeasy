import { useMemo, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

export default function ProductGrid({ query, category, onOpen, onAdded }) {
  const [sort, setSort] = useState("featured");
  const [primeOnly, setPrimeOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000);

  // useMemo: only recompute when one of the inputs changes.
  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchQuery =
        !query || p.title.toLowerCase().includes(query.toLowerCase());
      const matchPrime = !primeOnly || p.prime;
      return matchCat && matchQuery && matchPrime && p.price <= maxPrice;
    });

    switch (sort) {
      case "low":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "high":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [query, category, sort, primeOnly, maxPrice]);

  return (
    <section className="results">
      <div className="toolbar">
        <p>
          <strong>{results.length}</strong> result
          {results.length !== 1 && "s"}
          {query && (
            <>
              {" "}
              for “<span className="q">{query}</span>”
            </>
          )}
        </p>

        <label className="filter">
          <input
            type="checkbox"
            checked={primeOnly}
            onChange={(e) => setPrimeOnly(e.target.checked)}
          />
          Prime only
        </label>

        <label className="filter">
          Max price: <strong>₹{maxPrice.toLocaleString("en-IN")}</strong>
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>

        <label className="filter">
          Sort by:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Avg. Customer Review</option>
          </select>
        </label>
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <h2>No results found 😕</h2>
          <p>Try a different search term, category or price range.</p>
        </div>
      ) : (
        <div className="grid">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} onAdded={onAdded} />
          ))}
        </div>
      )}
    </section>
  );
}
