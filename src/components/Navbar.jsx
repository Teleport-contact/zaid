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
        <a href="/" className="md:size-16">
          <Logo/>
        </a>

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

const Logo = ()=> (
  <svg 
  className="w-full h-full" 
  width="32" 
  height="32" 
  viewBox="0 0 32 32" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M17.6051 31.1986C17.4888 31.1986 17.3796 31.136 17.2673 30.9816C14.379 27.0132 11.479 23.0535 8.58215 19.0915C8.5128 18.9967 8.44721 18.8991 8.42052 18.767L9.87724 20.3295C12.5545 23.2071 15.2326 26.0839 17.9052 28.9659C17.9834 29.0503 18.0499 29.0883 18.1227 29.0883C18.1807 29.0883 18.2426 29.0642 18.3176 29.0202C21.282 27.2803 24.2492 25.5451 27.2186 23.8138C27.3801 23.7197 27.4425 23.6103 27.4423 23.4218C27.4379 19.1399 27.4374 14.858 27.4434 10.5762C27.4437 10.3671 27.3591 10.2619 27.1926 10.1662C26.4947 9.76527 25.8077 9.34491 25.1055 8.95193C24.8949 8.83406 24.8306 8.69806 24.8316 8.46043C24.841 6.28657 24.8305 4.11265 24.8445 1.93887C24.8464 1.63608 24.7554 1.5597 24.4841 1.5597L24.4598 1.55992C23.5728 1.5735 23.5726 1.56228 23.5726 2.45707C23.5726 3.32343 23.5726 4.18979 23.5726 5.12789C23.0447 4.82814 22.5841 4.56448 22.1211 4.30515C22.0033 4.23924 22.0018 4.13184 22.0017 4.02185C22.001 2.77026 22.0036 1.51859 21.9994 0.266991C21.9987 0.0677337 22.0796 0.00197209 22.2698 0.00197209H22.272C22.9551 0.00470268 23.6371 0.00697817 24.319 0.00697817C24.9402 0.00697817 25.5613 0.00508193 26.1824 0H26.1843H26.1881C26.4647 0 26.427 0.169903 26.4269 0.344282C26.4262 2.7158 26.4328 5.08731 26.4188 7.45876C26.4169 7.77262 26.4984 7.95314 26.7803 8.10181C27.3761 8.4159 27.9489 8.7746 28.5347 9.10833C28.8479 9.28681 29.0001 9.5431 28.9998 9.91136C28.9966 14.6324 28.9966 19.3534 29.0002 24.0745C29.0005 24.4302 28.8576 24.6741 28.5548 24.8513C24.9969 26.9338 21.4417 29.0208 17.8844 31.1044C17.7843 31.1631 17.6926 31.1986 17.605 31.1986L17.6051 31.1986Z" 
      fill="url(#paint0_linear_243_6)"
    />
    <path 
      d="M15.6798 32L12.3909 30.0793C9.49879 28.3908 6.61158 26.6934 3.70975 25.0223C3.20401 24.7311 2.99799 24.3713 3.00001 23.7839C3.01613 19.2071 3.00976 14.6303 3.00736 10.0534C3.00714 9.68116 3.092 9.36001 3.42262 9.14589C3.49264 9.10053 3.55254 9.07542 3.61139 9.07542C3.68268 9.07542 3.75248 9.11221 3.8369 9.19443C4.83721 10.1685 5.60032 11.3325 6.41996 12.4506C8.60381 15.4294 10.7797 18.4142 12.9588 21.3967C12.9844 21.4318 13.0095 21.4674 12.9976 21.5378C10.2288 18.5713 7.46 15.6048 4.69432 12.6417C4.5515 12.7172 4.60091 12.8291 4.60083 12.9163C4.59791 16.4175 4.60158 19.9187 4.59139 23.4199C4.59071 23.6666 4.70451 23.7637 4.88354 23.8682C7.6631 25.4913 10.4397 27.1194 13.2192 28.7424C13.4211 28.8603 13.5839 29.0065 13.7217 29.1969C14.3867 30.1163 15.0595 31.03 15.7295 31.9458L15.6799 32H15.6798Z" 
      fill="url(#paint1_linear_243_6)"
    />
    <path 
      d="M6.3842 9.19944C6.29206 9.19944 6.21477 9.14149 6.13118 8.99988C5.97075 8.72811 5.77253 8.47591 5.56749 8.23539C5.41103 8.05191 5.43756 7.96688 5.64275 7.85C6.66316 7.26861 7.67682 6.67501 8.68987 6.08065C10.9132 4.77627 13.1397 3.47734 15.3528 2.15566C15.5856 2.01663 15.8002 1.94783 16.0142 1.94775H16.0143C16.2311 1.94775 16.4474 2.01837 16.6817 2.15809C18.8866 3.47264 21.1033 4.76678 23.3205 6.06017C23.5028 6.16659 23.5847 6.27786 23.5773 6.49654C23.5609 6.9863 23.5721 7.47705 23.5721 7.97204L23.5634 7.97219C23.379 7.97219 23.2759 7.86722 23.1612 7.80024C20.869 6.46294 18.5768 5.12563 16.2918 3.77588C16.187 3.71391 16.0972 3.68517 16.0093 3.68517C15.9114 3.68517 15.8159 3.72089 15.7046 3.78635C12.686 5.56184 9.66058 7.32588 6.64254 9.10243C6.53999 9.16281 6.45744 9.19944 6.3842 9.19944Z" 
      fill="url(#paint2_linear_243_6)"
    />
    <path 
      d="M15.2305 13.6528H15.2272C14.9077 13.6508 14.5899 13.6499 14.272 13.6499L13.3077 13.6524C13.3064 13.6524 13.305 13.6524 13.3037 13.6524C13.0635 13.6524 12.95 13.5447 12.9556 13.295C12.963 12.9664 12.9574 12.6377 12.9575 12.3091C12.9577 11.9914 12.9617 11.6736 12.9563 11.356C12.9523 11.1135 13.0548 10.9892 13.3004 10.9892L14.2406 10.9908C14.5781 10.9908 14.9156 10.9902 15.2531 10.9889H15.2555C15.4855 10.9889 15.5959 11.1163 15.5981 11.3321C15.6048 11.9893 15.6039 12.6467 15.5992 13.304C15.5975 13.5432 15.4668 13.653 15.2305 13.653V13.6528Z" 
      fill="url(#paint3_linear_243_6)"
    />
    <path 
      d="M15.242 9.83174H15.2344C15.1014 9.82954 14.9722 9.82893 14.843 9.82893L13.9659 9.82992C13.8748 9.82969 13.7838 9.82939 13.6927 9.82939L13.3145 9.83159C13.3108 9.83166 13.3071 9.83166 13.3034 9.83166C13.0721 9.83166 12.9533 9.73207 12.9554 9.48131C12.9609 8.82468 12.9591 8.1679 12.9567 7.51127C12.9559 7.27856 13.0677 7.16881 13.2933 7.16873H13.6149C13.7513 7.16873 13.8876 7.16873 14.024 7.16873L15.2421 7.16858C15.4877 7.16858 15.5968 7.31148 15.5987 7.54017C15.6039 8.18588 15.604 8.83166 15.5988 9.47737C15.597 9.7097 15.4774 9.83174 15.2418 9.83174H15.242Z" 
      fill="url(#paint4_linear_243_6)"
    />
    <path 
      d="M17.8246 13.6505L16.747 13.6468C16.5359 13.6453 16.4333 13.5181 16.4327 13.31C16.4309 12.6527 16.4305 11.9954 16.4328 11.3381C16.4336 11.1146 16.5462 10.9907 16.7726 10.9904L18.7554 10.9907C18.9867 10.9914 19.0809 11.1192 19.0765 11.3475C19.0701 11.676 19.0748 12.0048 19.0746 12.3334C19.0744 12.662 19.0707 12.9908 19.0756 13.3193C19.0789 13.5397 18.9712 13.6473 18.7623 13.6482L17.8246 13.6503V13.6505Z" 
      fill="url(#paint5_linear_243_6)"
    />
    <path 
      d="M16.7983 9.83099C16.5437 9.83099 16.4295 9.70083 16.4306 9.44552C16.4332 8.81983 16.4345 8.19415 16.4298 7.56854C16.4278 7.29404 16.5541 7.16699 16.8212 7.16699H16.8241C17.1423 7.16805 17.4607 7.16836 17.7789 7.16836L18.7131 7.16805C18.7131 7.16805 18.7131 7.16805 18.7132 7.16805C18.9711 7.16805 19.0805 7.29624 19.0774 7.55792C19.0697 8.19445 19.0704 8.83121 19.0768 9.46782C19.0794 9.7182 18.9675 9.83045 18.728 9.83045L17.748 9.83038C17.726 9.83038 17.7039 9.83038 17.6819 9.83038L16.8036 9.83106C16.8018 9.83106 16.8001 9.83106 16.7984 9.83106L16.7983 9.83099Z" 
      fill="url(#paint6_linear_243_6)"
    />
    <defs>
      <linearGradient 
        id="paint0_linear_243_6" 
        x1="18.7103" 
        y1="0" 
        x2="18.7103" 
        y2="31.1986" 
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9E6E23"/>
        <stop offset="1" stopColor="#FAD825"/>
      </linearGradient>
      <linearGradient 
        id="paint1_linear_243_6" 
        x1="9.37488" 
        y1="31.9878" 
        x2="9.37488" 
        y2="9.06323" 
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE25"/>
        <stop offset="1" stopColor="#9D6D23"/>
      </linearGradient>
      <linearGradient 
        id="paint2_linear_243_6" 
        x1="14.5268" 
        y1="9.25119" 
        x2="14.5268" 
        y2="-0.756632" 
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EFCC25"/>
        <stop offset="0.567337" stopColor="#A87A23"/>
      </linearGradient>
      <linearGradient 
        id="paint3_linear_243_6" 
        x1="14.2799" 
        y1="13.6504" 
        x2="14.2799" 
        y2="10.9863" 
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE25"/>
        <stop offset="1" stopColor="#9D6D23"/>
      </linearGradient>
      <linearGradient 
        id="paint4_linear_243_6" 
        x1="14.2811" 
        y1="9.83202" 
        x2="14.2811" 
        y2="7.16879" 
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE25"/>
        <stop offset="1" stopColor="#9D6D23"/>
      </linearGradient>
      <linearGradient 
        id="paint5_linear_243_6" 
        x1="17.7549" 
        y1="13.6508" 
        x2="17.7549" 
        y2="10.9897" 
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE25"/>
        <stop offset="1" stopColor="#9D6D23"/>
      </linearGradient>
      <linearGradient 
        id="paint6_linear_243_6" 
        x1="17.75" 
        y1="9.82967" 
        x2="17.75" 
        y2="7.16564" 
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE25"/>
        <stop offset="1" stopColor="#9D6D23"/>
      </linearGradient>
    </defs>
  </svg>
);

export {
  ActiveSectionProvider,
  useActiveSection,
  Navbar
};