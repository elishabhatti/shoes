import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaBoxOpen,
  FaHandshake,
  FaCheck,
  FaShoePrints, // New icon for 'Innovative Tech'
} from "react-icons/fa";
import {
  MdOutlineDesignServices,
} from "react-icons/md";
import TestimonialSection from "../components/TestimonialSection";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const heroHeadingRef = useRef(null);
  const sectionRefs = useRef([]);
  sectionRefs.current = []; // Initialize or clear on each render

  // Function to add refs dynamically
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP Animation for Hero Heading
    const tlHero = gsap.timeline();
    if (heroHeadingRef.current) {
      tlHero.fromTo(
        heroHeadingRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    }

    // GSAP Animations for sections with ScrollTrigger
    // Kill existing triggers to prevent duplicates on hot reload
    ScrollTrigger.getAll().forEach((trigger) => {
      if (sectionRefs.current.includes(trigger.trigger)) {
        trigger.kill();
      }
    });

    sectionRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // Adjust as needed
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      tlHero.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Framer Motion variants for page entrance
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const sectionReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="relative w-full min-h-screen font-sans text-gray-800"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Hero Section - Stride Footwear */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          {/* Left Content */}
          <div>
            <h1
              ref={heroHeadingRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              Step Forward with <br className="hidden sm:block" /> **Stride**
              Innovation.
            </h1>
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
              At **Stride**, we engineer **footwear** that masterfully blends
              **cutting-edge technology** with timeless style. We believe every
              step deserves comfort and superior performance. From elite
              athletics to daily commutes, find the perfect pair that keeps pace
              with your life's journey.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                Explore Sneakers
              </button>
              <button className="bg-transparent text-blue-600 border border-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
                Our Story
              </button>
            </div>
          </div>

          {/* Right Image (Aesthetic shot of modern sneakers) */}
          <div className="flex justify-center items-center">
            <img
              className="w-full max-w-lg h-auto rounded-xl shadow-lg"
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd621aa0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A pair of stylish, modern sneakers from Stride"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl uppercase font-bold text-center my-3">
            Client Reviews on Comfort and Durability
          </h1>
        </div>
        {/* Testimonial Section - Image URLs remain as placeholders since they represent people */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid justify-center items-center gap-3 grid-cols-3 w-full py-10"
        >
          <TestimonialSection
            img="https://cdn.britannica.com/74/177874-131-62098C6C/Jules-Verne.jpg"
            name="John Doe"
            email="john@example.com"
            review="These are the most comfortable running shoes I’ve ever owned. Amazing support and great for long distances!"
          />
          <TestimonialSection
            img="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
            name="Jane Smith"
            email="jane@example.com"
            review="The quality of the leather boots is outstanding, definitely built to last through multiple seasons."
          />
          <TestimonialSection
            img="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740"
            name="Ali Khan"
            email="ali@example.com"
            review="Loved the style and fit. The customer service team made sure I got the perfect size first try."
          />
          <TestimonialSection
            img="https://img.freepik.com/free-photo/smiling-man-with-tablet_23-2147800049.jpg?semt=ais_hybrid&w=740"
            name="Sara Williams"
            email="sara@example.com"
            review="My new hiking boots handled a tough trail without any issues. Great grip and zero break-in time needed."
          />
          <TestimonialSection
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Hqz3pj3UhZ-sCJ2zhB1tT6wI0ujEaX9o3lLPNiKfL7DD2il1dpfGQCRhUDywIrvFF3o&usqp=CAU"
            name="Mark Lee"
            email="mark@example.com"
            review="They truly care about their clients. It’s rare to find a team that combines technical skills with genuine customer care."
          />
          <TestimonialSection
            img="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="Emily Rodriguez"
            email="emily@example.com"
            review="A pleasure to work with from day one. Friendly, skilled, and always willing to accommodate my ideas and feedback."
          />
        </motion.div>

        {/* Section: Our Footwear Philosophy (Features) */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="my-10 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Our Footwear Philosophy: Performance from Sole to Finish
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <MdOutlineDesignServices className="text-purple-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ergonomic Design & Style
              </h3>
              <p className="text-gray-600">
                Our designers prioritize **foot health** and biomechanics while
                creating styles that set global footwear trends.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <FaShoePrints className="text-blue-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Innovative Midsole Technology
              </h3>
              <p className="text-gray-600">
                We utilize proprietary cushioning systems for maximum **energy
                return** and superior comfort in every step you take.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl  border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <FaHandshake className="text-green-600 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unwavering Commitment to Durability
              </h3>
              <p className="text-gray-600">
                Using high-grade, resilient materials, our footwear is rigorously
                tested to withstand your most **active lifestyle**.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section: Stride at a Glance (Metrics) */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24 p-10 bg-white rounded-3xl border border-gray-100"
        >
          {/* Left Content Column */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              **Stride** at a Glance: Our Impact & Reach
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Since our first shoe was crafted, **Stride** has been committed to
              delivering superior footwear globally. Review the key figures that
              highlight our dedication to quality, performance, and customer
              satisfaction across the market.
            </p>
          </div>

          {/* Right Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <p className="text-sm text-gray-500 font-semibold mb-1 uppercase">
                First Steps
              </p>
              <p className="text-4xl font-extrabold text-blue-600">2014</p>
              <p className="text-sm text-gray-600 mt-1">
                Engineering innovative footwear for over a decade.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <p className="text-sm text-gray-500 font-semibold mb-1 uppercase">
                Pairs Sold
              </p>
              <p className="text-4xl font-extrabold text-purple-600">2M+</p>
              <p className="text-sm text-gray-600 mt-1">
                Happy feet stepping forward worldwide.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <p className="text-sm text-gray-500 font-semibold mb-1 uppercase">
                Countries
              </p>
              <p className="text-4xl font-extrabold text-teal-600">65+</p>
              <p className="text-sm text-gray-600 mt-1">
                Global distribution and strong international presence.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <p className="text-sm text-gray-500 font-semibold mb-1 uppercase">
                Customer Rating
              </p>
              <p className="text-4xl font-extrabold text-red-600">4.8/5</p>
              <p className="text-sm text-gray-600 mt-1">
                Average satisfaction rating across all product lines.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section: Meet Our Design Visionaries (Leadership) */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24"
        >
          {/* Left Content */}
          <div className="p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl h-full flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Meet Our Footwear Innovators
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Our leadership team includes **award-winning designers** and
              material science experts who bring passion and cutting-edge
              research to every collection, ensuring every shoe is a masterpiece
              of performance.
            </p>
            <p className="text-md font-semibold opacity-80">
              Find your next great step with Stride!
            </p>
          </div>

          {/* Right Team Cards (Placeholder images remain) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <img
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200 shadow-md"
                src="https://randomuser.me/api/portraits/women/66.jpg"
                alt="Sarah Chen"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                Sarah Chen
              </h3>
              <p className="text-blue-600 text-md">Chief Footwear Engineer</p>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <img
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-purple-200 shadow-md"
                src="https://randomuser.me/api/portraits/men/71.jpg"
                alt="Michael Wong"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                Michael Wong
              </h3>
              <p className="text-purple-600 text-md">Head of Material Science</p>
            </div>
          </div>
        </motion.div>

        {/* Section: What Our Customers Say (Testimonials) */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 p-10 bg-white rounded-3xl border border-gray-100"
        >
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Hear The Buzz: What Our Customers Say
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Read authentic feedback from **athletes, hikers, and everyday
              users** who have experienced the difference of **Stride** footwear.
              Their reviews confirm our dedication to comfort, durability, and
              style.
            </p>
          </div>
          {/* Right Image Placeholder (Testimonial focused image) */}
          <div className="flex justify-center items-center">
            <img
              className="w-full max-w-lg h-auto rounded-xl shadow-lg"
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="People reviewing products in a casual office setting"
            />
          </div>
        </motion.div>

        {/* Section: Exclusive Collections (Product Lines) */}
        <motion.div
          ref={addToRefs}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Explore Our Core Footwear Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* The Apex Runner Collection */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                The Apex Runner
              </h3>
              <p className="text-gray-600 mb-6">
                Lightweight, responsive running shoes built for speed, distance,
                and **peak athletic performance**.
              </p>
              <img
                src="https://images.unsplash.com/photo-1542291026-6610344d49a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bright red running sneakers"
                className="w-full h-40 object-cover rounded-md mb-6"
              />
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> **StrataFoam**
                  Midsole Tech
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> Featherlight Mesh
                  Upper
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> High-Traction Rubber
                  Outsole
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                View Collection
              </button>
            </div>

            {/* Urban Explorer Collection */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Urban Explorer
              </h3>
              <p className="text-gray-600 mb-6">
                Stylish, durable boots and casuals designed for the demands of the
                city streets and **daily wear**.
              </p>
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810cb99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Stylish leather boots"
                className="w-full h-40 object-cover rounded-md mb-6"
              />
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> Premium Sustainable
                  Leather
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> Water-Resistant
                  Finish
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> All-Day Comfort Insole
                </li>
              </ul>
              <button className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors">
                View Collection
              </button>
            </div>

            {/* Trail Blazer Collection */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Trail Blazer
              </h3>
              <p className="text-gray-600 mb-6">
                Rugged hiking and outdoor footwear built for **stability, grip,
                and challenging environments**.
              </p>
              <img
                src="https://images.unsplash.com/photo-1555547477-98782f9c8949?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Rugged hiking boots outdoors"
                className="w-full h-40 object-cover rounded-md mb-6"
              />
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> Ankle Support System
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> Deep-Lug **GripTread**
                  Outsole
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> Fully Waterproof &
                  Breathable
                </li>
              </ul>
              <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors">
                View Collection
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;