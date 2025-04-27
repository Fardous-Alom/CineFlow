"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../lib/store/cartSlice";
import { getProducts } from "../lib/store/productSlice";
import Link from "next/link";

function ProductGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.products);
  const addToCart = (product) => {
    dispatch(add(product));
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        dispatch(getProducts());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative h-48">
                <img
                  src={`https://admin.refabry.com/storage/product/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
                  {product.name}
                </h3>
              </Link>

              <p className="text-gray-600 text-sm mb-2">
                {product.category.name}
              </p>

              <div className="mb-3">
                <span className="font-bold text-lg">
                  {product.price.toFixed(2)} BDT
                </span>

                {/* Discount if available */}
                {product.is_discount && (
                  <div className="mt-1">
                    <span className="line-through text-red-500 mr-2">
                      {(
                        product.price + parseFloat(product.discount_amount)
                      ).toFixed(2)}{" "}
                      BDT
                    </span>
                    <span className="text-green-600 text-sm">
                      (Save {product.discount_amount} BDT)
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <p
                className={`mb-2 text-sm ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </p>

              {/* Product Code */}
              <p className="text-gray-500 text-xs mb-3">Code: {product.code}</p>

              {/* Description */}
              <div className="border-t pt-3">
                {product.short_desc.split("\r\n").map((line, i) => (
                  <p key={i} className="text-gray-700 text-sm mb-1">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
