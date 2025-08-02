// src/components/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "الرئيسية", href: "#" },
    { name: "من نحن", href: "#" },
    { name: "المعرض", href: "#" },
    { name: "تواصل معنا", href: "#" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar at top of page
      if (currentScrollY === 0) {
        setIsVisible(true);
        prevScrollY.current = currentScrollY;
        return;
      }
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > prevScrollY.current && isVisible) {
        setIsVisible(false);
      } else if (currentScrollY < prevScrollY.current && !isVisible) {
        setIsVisible(true);
      }
      
      prevScrollY.current = currentScrollY;
    };

    // Close menu when scrolling
    const handleScrollCloseMenu = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollCloseMenu);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollCloseMenu);
    };
  }, [isVisible, isOpen]);

  return (
    <motion.header
      ref={navRef}
      className="sticky flex h-16 md:h-24 items-center justify-between bg-[#F6F5F4] border-b-3 border-black p-6 top-0 z-50 shadow-sm"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href} 
                  className="hover:text-blue-600 transition-colors font-medium text-lg"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiOutlineMenuAlt3 className="h-6 w-6" />
            )}
          </motion.div>
        </button>

        {/* Logo */}
        <img src="/logo.svg" alt="logo" className="md:size-16"/>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute left-0 w-full bg-[#222222] shadow-lg overflow-hidden"
            style={{ top: "100%" }}
          >
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="py-4 px-4 space-y-3"
            >
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "#A1ABB4" }}
                  className="py-2 px-4 rounded-md flex items-center gap-4"
                >
                  <div className="w-[5px] h-8 bg-white" />
                  <a
                    href={item.href}
                    className="block text-white text-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}