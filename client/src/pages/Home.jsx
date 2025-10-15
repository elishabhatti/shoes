import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingText from "../components/RotatingText";
import LoadingSpinner from "../components/LoadingSpinner";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // New States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const navigate = useNavigate();
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const sectionTitleRef = useRef(null);

  useEffect(() => {
    getAllProducts();
    getWishlist();

    // Animation
    if (heroRef.current && headingRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.9 },
          "<0.4"
        )
        .fromTo(
          ".rotating-text-element",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.7, stagger: 0.03 },
          "<0.2"
        );
    }

    if (sectionTitleRef.current) {
      gsap.fromTo(
        sectionTitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionTitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const getWishlist = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/users/get-wishlist-product",
        { withCredentials: true }
      );
      const ids = res.data.products.map((p) => p._id);
      setWishlist(ids);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/products/get-product",
        { withCredentials: true }
      );
      setProducts(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  const addProductToWishList = async (id) => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/add-wishList",
        { id },
        { withCredentials: true }
      );
      getWishlist();
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.warning("Already in wishlist!");
    }
  };

  // --- Filtering and Sorting Logic ---
  const categories = ["All", "Puma", "Adidas", "Nike"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (p) => p.brand?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  // --- Pagination ---
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePrevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="py-8 px-4 sm:px-6 md:px-10 xl:px-20 w-full font-sans min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div
        ref={heroRef}
        className="relative my-5 overflow-hidden rounded-3xl shadow-xl"
      >
        <img
<<<<<<< HEAD
          className="h-72 sm:h-96 md:h-[500px] lg:h-[550px] w-full object-cover brightness-[0.85]"
          src="
          https://cloudfront-us-east-2.images.arcpublishing.com/reuters/NKYZ3DCPBRMHVL3LP65XEHONXA.jpg"
          alt="Sneaker Showcase"
=======
          className="h-64 sm:h-96 md:h-[500px] lg:h-[550px] w-full object-cover brightness-[0.85] rounded-lg"
          src="/images/home-banner.webp"
          alt="Scenic view of plants"
>>>>>>> ff8573d85917c6ea07d4dc1df699d5d9c17a1e67
        />
        <h1
          ref={headingRef}
          className="absolute flex flex-col items-start gap-4 top-10 left-10 text-white text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
        >
          Step Into Style
          <RotatingText
            texts={[
              "Run Faster",
              "Look Cooler",
              "Feel Lighter",
              "Walk Stronger",
              "Be Limitless",
            ]}
            mainClassName="px-4 overflow-hidden py-2 bg-white/25 backdrop-blur-md text-white rounded-lg shadow-inner border border-white/30"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1 rotating-text-element"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2200}
          />
        </h1>
      </div>

      {/* Section Title */}
      <h1
        ref={sectionTitleRef}
        className="text-3xl sm:text-4xl font-bold mb-8 mt-10 text-center text-gray-900"
      >
        Discover Our <span className="text-purple-600">Exclusive Sneakers</span>
      </h1>

      {/* Filter & Sorting Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white border-purple-600"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
<<<<<<< HEAD
      ) : paginatedProducts.length > 0 ? (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product._id || index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transition-all group"
              >
                <div className="w-full h-56 bg-gray-50 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isFeatured && (
                    <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      New Drop
                    </span>
                  )}
=======
      ) : products.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id || index}
              className="border border-gray-100 rounded-xl overflow-hidden flex flex-col min-h-[400px] sm:min-h-[430px] shadow-sm hover:shadow-md transition-shadow duration-200 bg-white group"
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-full h-48 sm:h-56 overflow-hidden rounded-t-xl relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.isFeatured && (
                  <motion.span
                    initial={{ x: "100%" }}
                    animate={{ x: "0%" }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: 0.1,
                    }}
                    className="absolute top-4 right-4 text-xs font-semibold text-white bg-blue-500 rounded-full px-3 py-1 shadow-md"
                  >
                    Featured
                  </motion.span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-1 mb-1">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-snug">
                  {product.description}
                </p>
                <p className="text-gray-500 text-xs mb-3 font-medium uppercase tracking-wide">
                  Brand:{" "}
                  <span className="font-semibold text-gray-700">
                    {product.brand}
                  </span>
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-gray-900 font-bold text-xl">
                    PKR: {product.price.toFixed(2)}
                  </span>
                  <span className="text-yellow-500 text-sm font-semibold flex items-center">
                    <span className="mr-1">⭐</span> {product.rating} (
                    {product.reviews})
                  </span>
>>>>>>> ff8573d85917c6ea07d4dc1df699d5d9c17a1e67
                </div>

                <div className="p-5 flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {product.title || "Nike Air Zoom Pegasus 41"}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {product.description ||
                      "Experience next-level comfort and speed with the Air Zoom series — lightweight, durable, and made to move."}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price || 120}
                    </span>
                    <span className="text-yellow-500 text-sm font-semibold">
                      ⭐ {product.rating || 4.8}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 mt-auto">
                    <motion.button
                      whileHover={{ backgroundColor: "#111827", scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (!token) toast.error("Please login first");
                        else navigate(`product-details/${product._id}`);
                      }}
                      className="flex-1 bg-gray-900 text-white rounded-lg py-3 text-sm font-medium shadow-md"
                    >
                      Buy Now
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (!token) toast.error("Please login first");
                        else navigate(`product-cart/${product._id}`);
                      }}
                      className="bg-purple-600 text-white rounded-lg p-3 shadow-md"
                    >
                      <ShoppingCart size={20} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (!token) toast.error("Please login first");
                        else addProductToWishList(product._id);
                      }}
                      className="bg-red-500 text-white rounded-lg p-3 shadow-md"
                    >
                      {wishlist.includes(product._id) ? (
                        <Heart fill="white" size={20} />
                      ) : (
                        <Heart size={20} />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">
            No sneakers available right now. Check back soon!
          </p>
        </div>
      )}
      <div className="flex justify-center items-center w-full py-10 my-5 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            <motion.span>🚀</motion.span> More Products Coming Soon!
          </p>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Stay tuned — something exciting is on the way.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
