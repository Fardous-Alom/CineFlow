"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../lib/store/cartSlice";
import { getProducts } from "../lib/store/productSlice";
import Link from "next/link";
import { IoHeart, IoCart } from "react-icons/io5";

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
    <section className="py-8 antialiased md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <h2 className="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
            Trending Products
          </h2>
        </div>

        <div className="mb-4  grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm"
            >
              <div className="relative h-56 w-full">
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-48">
                    <img
                      src={`https://admin.refabry.com/storage/product/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </div>

              <div className="py-4 px-2">
                <div className="mb-4 flex items-center justify-between gap-4">
                  {/* product category */}
                  <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {product.category.name}
                    {/* {product.is_discount && (
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
                    )} */}
                  </span>

                  {/* wishlist button */}
                  <button
                    type="button"
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    aria-label={`Add ${product.name} to favorites`}
                  >
                    <IoHeart className="h-5 w-5" />
                  </button>
                </div>
                {/* product name */}
                <Link
                  href={`/products/${product.id}`}
                  passHref
                  id={`product-${product.id}-title`}
                  className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
                >
                  {product.name}
                </Link>

                <div className="mt-2 flex items-center gap-2">
                  <p
                    className={`mb-2 text-sm ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </p>
                </div>

                {/* price */}
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-2xl font-extrabold leading-tight text-gray-900">
                    ৳{product.price.toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    <IoCart className="-ms-2 me-2 h-5 w-5" />
                    Add to cart
                  </button>
                </div>

                {/* Product Code */}
                {/* <p className="text-gray-500 text-xs mb-3">
                  Code: {product.code}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
