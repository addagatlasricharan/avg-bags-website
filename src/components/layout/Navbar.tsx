import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import avgLogo from "@assets/ChatGPT_Image_May_20,_2026,_11_19_23_AM_1779256187909.png";

export const Navbar = () => {
  const [location] = useLocation();
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shopping", path: "/shopping" },
    { name: "Services", path: "/services" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/30"
      }`}
    >
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center" data-testid="link-logo">
          {/* 3D logo: flips in on mount, tilts on hover */}
          <motion.div
            initial={{ rotateY: -180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ rotateY: 15, scale: 1.05 }}
            style={{ perspective: 600, transformStyle: "preserve-3d" }}
            className="cursor-pointer"
          >
            <img
              src={avgLogo}
              alt="AVG Bags Logo"
              className="h-20 w-auto object-contain rounded-xl drop-shadow-md"
              draggable={false}
            />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  data-testid={`link-nav-${link.name.toLowerCase().replace(" ", "-")}`}
                  className={`text-sm font-medium transition-colors hover:text-secondary ${
                    location === link.path
                      ? "text-secondary font-semibold"
                      : isTransparent
                      ? "text-white/90"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Link href="/quote" data-testid="link-get-quote">
              <Button
                className={`rounded-full px-5 text-sm font-semibold transition-all ${
                  isTransparent
                    ? "bg-white/10 text-white border border-white/30 hover:bg-white/20"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                Get Quote
              </Button>
            </Link>
            <Link
              href="/cart"
              data-testid="link-cart"
              className={`relative p-2 rounded-full transition-colors hover:bg-black/5 ${
                isTransparent ? "text-white" : "text-foreground"
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-secondary text-secondary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors hover:bg-black/5 ${
            isTransparent ? "text-white" : "text-foreground"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-xl border-t border-border/30 py-6 px-6 flex flex-col gap-2">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    location === link.path
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.name.toLowerCase().replace(" ", "-")}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/30">
            <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-primary text-white rounded-xl">Get Quote</Button>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-foreground hover:bg-muted/50 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart {itemCount > 0 ? `(${itemCount})` : ""}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
