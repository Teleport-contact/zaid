"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const ACTIVE_SECTION_COOKIE_NAME = "active_section";
const ACTIVE_SECTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

const ActiveSectionContext = React.createContext(null);

function useActiveSection() {
  const context = React.useContext(ActiveSectionContext);
  if (!context) {
    throw new Error("useActiveSection must be used within an ActiveSectionProvider");
  }
  return context;
}

function ActiveSectionProvider({
  defaultSection = "/#",
  activeSection: activeSectionProp,
  onActiveSectionChange: setActiveSectionProp,
  children
}) {
  const [_activeSection, _setActiveSection] = React.useState(defaultSection);
  
  const activeSection = activeSectionProp ?? _activeSection;
  const setActiveSection = React.useCallback(
    (section) => {
      if (setActiveSectionProp) {
        setActiveSectionProp(section);
      } else {
        _setActiveSection(section);
      }
      
      document.cookie = `${ACTIVE_SECTION_COOKIE_NAME}=${section}; path=/; max-age=${ACTIVE_SECTION_COOKIE_MAX_AGE}`;
    },
    [setActiveSectionProp]
  );

  React.useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${ACTIVE_SECTION_COOKIE_NAME}=`))
      ?.split("=")[1];
    
    if (cookieValue) {
      setActiveSection(cookieValue);
    }
  }, [setActiveSection]);

  React.useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    const handleScroll = () => {
      let current = "";
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = `#${section.id}`;
        }
      });
      
      setActiveSection(current || "#");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveSection]);

  const contextValue = React.useMemo(
    () => ({
      activeSection,
      setActiveSection,
    }),
    [activeSection, setActiveSection]
  );

  return (
    <ActiveSectionContext.Provider value={contextValue}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const prevScrollY = React.useRef(0);
  const navRef = React.useRef(null);
  const { activeSection, setActiveSection } = useActiveSection();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "الرئيسية", href: "/#" },
    { name: "من نحن", href: "/#about-us" },
    { name: "المعرض", href: "/gallary" },
    { name: "تواصل معنا", href: "/#contact-us" },
    
  ];

  const handleNavClick = (href) => {
    setActiveSection(href);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY === 0) {
        setIsVisible(true);
        prevScrollY.current = currentScrollY;
        return;
      }
      
      if (currentScrollY > prevScrollY.current && isVisible) {
        setIsVisible(false);
      } else if (currentScrollY < prevScrollY.current && !isVisible) {
        setIsVisible(true);
      }
      
      prevScrollY.current = currentScrollY;
    };

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
      className="sticky w-full h-fit flex items-center justify-between p-6 lg:px-16 bg-[#F6F5F4] border-b-3 border-black top-0 z-50 shadow-sm"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -140 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div className="w-full h-fit flex justify-between items-center">
        <img src="logo.svg" alt="logo" className="md:size-16"/>

        <nav className="hidden md:block">
          <ul className="flex flex-row-reverse gap-8">
            {menuItems.map((item) => (
              <li key={item.name} className="flex gap-4 items-center">
                <a 
                  href={item.href} 
                  className={`${activeSection === item.href ? 'text-black font-normal' : 'text-[#333333] ligh-font'} hover:text-black transition-colors `}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.name}
                </a>
                {activeSection === item.href && (
                  <motion.div
                    className="w-[3px] h-8 bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={toggleMenu}
          className="md:hidden rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
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
      </div>

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
                  className="py-2 px-4 rounded-md flex items-center justify-end gap-4"
                > 
                  <a
                    href={item.href}
                    className="block text-white text-xl"
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.name}
                  </a>
                  {activeSection === item.href && (
                    <motion.div
                      className="w-[3px] h-8 bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export {
  ActiveSectionProvider,
  useActiveSection,
  Navbar
};