import { useCallback, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import CategoryBar from "./components/CategoryBar.jsx";
import Hero from "./components/Hero.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import ProductModal from "./components/ProductModal.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Checkout from "./components/Checkout.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";
import Toast from "./components/Toast.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // "view" decides which page to show: shop | checkout | success
  const [view, setView] = useState("shop");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null); // product shown in modal
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [order, setOrder] = useState(null);

  const clearToast = useCallback(() => setToast(""), []);
  const closeModal = useCallback(() => setSelected(null), []);

  const goShop = () => {
    setView("shop");
    window.scrollTo({ top: 0 });
  };

  const goCheckout = () => {
    setCartOpen(false);
    setSelected(null);
    setView("checkout");
    window.scrollTo({ top: 0 });
  };

  const handleLogo = () => {
    setQuery("");
    setCategory("All");
    goShop();
  };

  return (
    <div className="app">
      <Navbar
        query={query}
        onSearch={(q) => {
          setQuery(q);
          setView("shop");
        }}
        category={category}
        onCategoryChange={setCategory}
        onCartClick={() => setCartOpen(true)}
        onLogoClick={handleLogo}
      />

      {view === "shop" && (
        <>
          <CategoryBar active={category} onSelect={setCategory} />
          <main>
            <Hero />
            <ProductGrid
              query={query}
              category={category}
              onOpen={setSelected}
              onAdded={(p) => setToast(`${p.title} added to cart`)}
            />
          </main>
        </>
      )}

      {view === "checkout" && (
        <main>
          <Checkout
            onBack={goShop}
            onSuccess={(o) => {
              setOrder(o);
              setView("success");
              window.scrollTo({ top: 0 });
            }}
          />
        </main>
      )}

      {view === "success" && order && (
        <main>
          <OrderSuccess order={order} onContinue={goShop} />
        </main>
      )}

      {selected && (
        <ProductModal
          product={selected}
          onClose={closeModal}
          onAdded={(p) => setToast(`${p.title} added to cart`)}
          onBuyNow={goCheckout}
        />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={goCheckout}
      />

      <Toast message={toast} onDone={clearToast} />
      <Footer />
    </div>
  );
}
