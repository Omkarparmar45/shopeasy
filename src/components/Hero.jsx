import { useEffect, useState } from "react";

const SLIDES = [
  {
    title: "Festive Sale is LIVE",
    text: "Up to 60% off on electronics, fashion and more",
    emoji: "🎉",
    colors: ["#232f3e", "#37475a"],
  },
  {
    title: "Back to Reading",
    text: "Bestselling books starting at just ₹399",
    emoji: "📚",
    colors: ["#0f5132", "#198754"],
  },
  {
    title: "Home Makeover",
    text: "Kitchen & home essentials at unbeatable prices",
    emoji: "🏠",
    colors: ["#7a3e00", "#c26a00"],
  },
];

// Auto-rotating banner: a good example of useState + useEffect with cleanup.
export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id); // cleanup when component unmounts
  }, []);

  const go = (dir) =>
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[index];

  return (
    <section
      className="hero"
      style={{
        background: `linear-gradient(135deg, ${slide.colors[0]}, ${slide.colors[1]})`,
      }}
    >
      <button className="hero-arrow left" onClick={() => go(-1)} aria-label="Previous">
        ‹
      </button>

      <div className="hero-content">
        <div>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
        </div>
        <div className="hero-emoji">{slide.emoji}</div>
      </div>

      <button className="hero-arrow right" onClick={() => go(1)} aria-label="Next">
        ›
      </button>

      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
