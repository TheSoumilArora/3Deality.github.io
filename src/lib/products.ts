// src/lib/products.ts

export interface Product {
    slug: string;          // used in URLs
    name: string;          // display name
    category: string;      // must match your [category] route, e.g. "plane-kits"
    price: string;         // e.g. "₹450"
    image: string;         // path or URL to an image
  }
  
  // 🧩 Sample products array
  export const products: Product[] = [
    {
      slug: "mig-29",
      name: "MiG-29 EDF Jet Plane Kit",
      category: "plane-kits",
      price: "₹450",
      image: "/images/mig-29.jpg",
    },
    {
      slug: "f22-raptor",
      name: "F-22 Raptor Jet Plane Kit",
      category: "plane-kits",
      price: "₹550",
      image: "/images/f22-raptor.jpg",
    },
    {
      slug: "fpv-frame-220",
      name: "FPV Drone Frame 220mm",
      category: "fpv-parts",
      price: "₹350",
      image: "/images/fpv-220.jpg",
    },
    // …add more items as you like
  ];
