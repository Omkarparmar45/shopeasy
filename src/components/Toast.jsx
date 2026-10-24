import { useEffect } from "react";

// Small popup that disappears after 2.5 seconds.
export default function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onDone, 2500);
    return () => clearTimeout(id);
  }, [message, onDone]);

  if (!message) return null;
  return <div className="toast">✔ {message}</div>;
}
