import React from "react";

const Product = ({ product }) => {
  // Format price with currency symbol
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT", // Assuming Bangladeshi Taka based on the price format
  }).format(product.price);

  // Format the short description with line breaks
  const formattedDescription = product.short_desc
    .split("\r\n")
    .map((line, i) => <p key={i}>{line}</p>);

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={`https://admin.refabry.com/storage/${product.image}`}
          alt={product.name}
        />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <div className="product-category">{product.category.name}</div>
        <div className="product-price">
          {formattedPrice}
          {product.is_discount && (
            <span className="discount">
              <s>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "BDT",
                }).format(product.price + parseFloat(product.discount_amount))}
              </s>
              <span className="discount-amount">
                Save {product.discount_amount}
              </span>
            </span>
          )}
        </div>
        <div className="product-stock">
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </div>
        <div className="product-code">Product Code: {product.code}</div>
        <div className="product-description">{formattedDescription}</div>
      </div>
    </div>
  );
};

export default Product;
