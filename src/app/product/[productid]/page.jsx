"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '@/lib/store/cartSlice';
import { getProducts } from '@/lib/store/productSlice';

function ProductPage({ params }) {
  const dispatch = useDispatch();
  const { data: products, loading } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find(p => p.id === parseInt(params.productId));
      setProduct(foundProduct);
    }
  }, [products, params.productId]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(add(product));
    }
  };

  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full rounded-lg"
              src={`https://admin.refabry.com/storage/product/${product.image}`}
              alt={product.name}
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {product.name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {product.price.toFixed(2)} BDT
              </p>

              {product.is_discount && (
                <div className="mt-2 sm:mt-0">
                  <span className="line-through text-red-500 mr-2">
                    {(product.price + parseFloat(product.discount_amount)).toFixed(2)} BDT
                  </span>
                  <span className="text-green-600">
                    Save {product.discount_amount} BDT
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      className="h-2.5 w-2.5 text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      className="h-2.5 w-2.5 text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
                <p className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
              <div className="mt-4 space-y-4">
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span> {product.category.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Product Code:</span> {product.code}
                </p>
                <div className="text-gray-600">
                  <span className="font-medium">Description:</span>
                  {product.short_desc.split("\r\n").map((line, i) => (
                    <p key={i} className="mt-1">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
