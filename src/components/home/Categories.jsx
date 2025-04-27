"use client";
import {
  FaLaptop,
  FaTshirt,
  FaMobileAlt,
  FaGamepad,
  FaTv,
  FaMagic,
  FaSmile,
  FaStore,
  FaHeartbeat,
  FaTruck,
  FaBook,
  FaHome,
  FaCamera,
  FaClipboardCheck,
  FaEye,
} from "react-icons/fa";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const categories = [
  { label: "Computers", icon: FaLaptop },
  { label: "Fashion", icon: FaTshirt },
  { label: "Electronics", icon: FaMobileAlt },
  { label: "Gaming", icon: FaGamepad },
  { label: "TV/Projectors", icon: FaTv },
  { label: "Toys", icon: FaMagic },
  { label: "Sport", icon: FaSmile },
  { label: "Grocery", icon: FaStore },
  { label: "Health", icon: FaHeartbeat },
  { label: "Auto", icon: FaTruck },
  { label: "Books", icon: FaBook },
  { label: "Home", icon: FaHome },
  { label: "Photo/Video", icon: FaCamera },
  { label: "Collectibles", icon: FaClipboardCheck },
  { label: "Beauty", icon: FaEye },
  { label: "Phone/Tablets", icon: FaMobileAlt },
];

const Categories = () => {
  const scroll = (offset) => {
    const container = document.getElementById("categories-container");
    if (container) {
      container.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="text-white py-10 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
          <button
            onClick={() => scroll(-300)}
            className="text-black hover:text-secondary p-2 rounded-full"
          >
            <IoChevronBackOutline size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
          <button
            onClick={() => scroll(300)}
            className="text-primary hover:text-secondary p-2 rounded-full"
          >
            <IoChevronForwardOutline size={24} />
          </button>
        </div>

        {/* Scrollable Categories */}
        <div
          id="categories-container"
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {categories.map((category) => (
            <div
              key={category.label}
              className="flex flex-col items-center gap-3 min-w-[100px]"
            >
              <div className="w-16 h-16 rounded-full bg-primary hover:bg-secondary flex items-center justify-center">
                <category.icon className="text-2xl" />
              </div>
              <span className="text-sm font-medium text-center text-black">
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
