export const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");

export const discountPercent = (price, mrp) =>
  Math.round(((mrp - price) / mrp) * 100);
