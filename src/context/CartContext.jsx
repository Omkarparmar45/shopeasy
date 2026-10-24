import { createContext, useContext, useEffect, useReducer } from "react";

// Context + useReducer: a common pattern for global state (like a cart).

const CartContext = createContext(null);
const STORAGE_KEY = "shopeasy-cart";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty } = action;
      const existing = state.find((i) => i.id === product.id);
      if (existing) {
        return state.map((i) =>
          i.id === product.id
            ? { ...i, qty: Math.min(i.qty + qty, product.stock) }
            : i
        );
      }
      return [...state, { ...product, qty: Math.min(qty, product.stock) }];
    }
    case "SET_QTY": {
      return state
        .map((i) =>
          i.id === action.id
            ? { ...i, qty: Math.max(0, Math.min(action.qty, i.stock)) }
            : i
        )
        .filter((i) => i.qty > 0);
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function loadInitialCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadInitialCart);

  // Persist the cart so it survives a page refresh.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage errors */
    }
  }, [items]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const value = {
    items,
    count,
    subtotal,
    addToCart: (product, qty = 1) => dispatch({ type: "ADD", product, qty }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
    removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
