"use client";
import React, { useEffect, useState } from "react";
import navData from "../data/navigation.json";
import "../styles/Navbar.css";
import { FiMenu, FiX } from "react-icons/fi"; 

const Navbar = () => {
  const [active, setActive] = useState("#Hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      navData.menu.forEach((item) => {
        const section = document.querySelector(item.link);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActive(item.link);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">{navData.logo}</div>
        <div className="menu-toggle" onClick={toggleMenu}>
  {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
</div>
        <ul className={`menu ${menuOpen ? "open" : ""}`}>
          {navData.menu.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                className={active === item.link ? "active" : ""}
                onClick={() => setMenuOpen(false)} // close menu after click
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
