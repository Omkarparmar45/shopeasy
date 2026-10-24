export default function Footer() {
  return (
    <footer>
      <button
        className="to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>
      <div className="footer-cols">
        <div>
          <h4>Get to Know Us</h4>
          <p>About ShopEasy</p>
          <p>Careers</p>
          <p>Press Releases</p>
        </div>
        <div>
          <h4>Make Money with Us</h4>
          <p>Sell on ShopEasy</p>
          <p>Become an Affiliate</p>
        </div>
        <div>
          <h4>Let Us Help You</h4>
          <p>Your Account</p>
          <p>Returns Centre</p>
          <p>Help</p>
        </div>
      </div>
      <p className="copy">
        © 2026 ShopEasy – a learning project built with React. Not affiliated with Amazon.
      </p>
    </footer>
  );
}
