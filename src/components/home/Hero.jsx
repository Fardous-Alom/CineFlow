"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/homeCarousel/hero1.jpg",
  "/homeCarousel/hero2.jpg",
  "/homeCarousel/hero3.jpg",
  "/homeCarousel/hero4.jpg",
  "/homeCarousel/hero5.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-56 md:h-96 rounded-lg overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            fill
            className="object-cover"
            alt={`Slide ${i + 1}`}
            priority={i === current}
          />
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 flex gap-2 -translate-x-1/2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-blue-500" : "bg-gray-300 cursor-pointer"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute top-0 left-0 h-full px-4 text-white text-xl cursor-pointer"
      >
        ❮
      </button>
      <button
        onClick={next}
        className="absolute top-0 right-0 h-full px-4 text-white text-xl cursor-pointer"
      >
        ❯
      </button>
    </div>
  );
}
