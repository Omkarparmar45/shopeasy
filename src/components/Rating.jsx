// Shows star rating like ★★★★☆ plus review count.
export default function Rating({ value, reviews }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return "★";
    if (i === full && half) return "★";
    return "☆";
  });

  return (
    <div className="rating" aria-label={`${value} out of 5 stars`}>
      <span className="stars">{stars.join("")}</span>
      <span className="reviews">{reviews.toLocaleString("en-IN")}</span>
    </div>
  );
}
