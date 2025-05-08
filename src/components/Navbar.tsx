"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

// Define all nav items: those with `href` are page links, others scroll to an ID.
const NAV_ITEMS = [
  { key: "home",     label: "Home",     scrollTo: "home"      },
  { key: "services", label: "Services", scrollTo: "services"  },
  { key: "products", label: "Products", href: "/products"     },
  { key: "about",    label: "About",    scrollTo: "about"     },
  { key: "contact",  label: "Contact",  scrollTo: "contact"   },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Smooth-scroll on hash change
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [pathname]);

  // Handle clicks for in-page anchors
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                3Deality
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) =>
                item.href ? (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.key}
                    href={`#${item.scrollTo}`}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={(e) => handleScroll(e, item.scrollTo!)}
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile hamburger button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed bottom-4 right-4 z-50 p-4 rounded-full bg-primary text-white shadow-lg"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile nav overlay + menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.nav
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-3xl z-50 md:hidden"
            >
              <div className="py-6 px-4 space-y-4">
                {NAV_ITEMS.map((item) =>
                  item.href ? (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="block px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors text-center text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.key}
                      href={`#${item.scrollTo}`}
                      className="block px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors text-center text-lg"
                      onClick={(e) => handleScroll(e, item.scrollTo!)}
                    >
                      {item.label}
                    </a>
                  )
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};