import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Mock products data - this would normally come from an API
const productsData = {
  "fixed-wings": [
    { id: "fw1", name: "Aerodynamic Model A", price: 2499, image: "https://images.unsplash.com/photo-1599157134318-191be6117dea?q=80&w=500&auto=format&fit=crop", category: "Fixed Wings" },
    { id: "fw2", name: "RC Plane Model B", price: 1899, image: "https://images.unsplash.com/photo-1612387290123-34af734b5f61?q=80&w=500&auto=format&fit=crop", category: "Fixed Wings" },
    { id: "fw3", name: "Professional Glider", price: 3299, image: "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?q=80&w=500&auto=format&fit=crop", category: "Fixed Wings" },
    { id: "fw4", name: "Aerobatic Aircraft", price: 4599, image: "https://images.unsplash.com/photo-1581347819376-2ab481f938b7?q=80&w=500&auto=format&fit=crop", category: "Fixed Wings" },
  ],
  "drone-parts": [
    { id: "dp1", name: "Carbon Fiber Propeller", price: 999, image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=500&auto=format&fit=crop", category: "Drone Parts" },
    { id: "dp2", name: "Multi-rotor Frame", price: 1499, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop", category: "Drone Parts" },
    { id: "dp3", name: "Brushless Motor Set", price: 2599, image: "https://images.unsplash.com/photo-1600865624470-481f0ecac1df?q=80&w=500&auto=format&fit=crop", category: "Drone Parts" },
    { id: "dp4", name: "FPV Camera Mount", price: 899, image: "https://images.unsplash.com/photo-1495527400402-28c32b2a097b?q=80&w=500&auto=format&fit=crop", category: "Drone Parts" },
  ],
  "miniatures": [
    { id: "m1", name: "Fantasy Character Set", price: 1299, image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=500&auto=format&fit=crop", category: "Miniatures" },
    { id: "m2", name: "Architectural Model", price: 1999, image: "https://images.unsplash.com/photo-1580902394724-b08ff9ba7e8a?q=80&w=500&auto=format&fit=crop", category: "Miniatures" },
    { id: "m3", name: "Sci-Fi Vehicle Collection", price: 3499, image: "https://images.unsplash.com/photo-1635217461472-8a6d6e1ce209?q=80&w=500&auto=format&fit=crop", category: "Miniatures" },
    { id: "m4", name: "Custom Character Portrait", price: 1699, image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=500&auto=format&fit=crop", category: "Miniatures" },
  ],
  "tools": [
    { id: "t1", name: "Precision Filing Set", price: 1499, image: "https://images.unsplash.com/photo-1581147036324-c71f53e395f7?q=80&w=500&auto=format&fit=crop", category: "Tools" },
    { id: "t2", name: "3D Print Finishing Kit", price: 2499, image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=500&auto=format&fit=crop", category: "Tools" },
    { id: "t3", name: "Model Airbrush System", price: 5999, image: "https://images.unsplash.com/photo-1623121581663-55a3518c2543?q=80&w=500&auto=format&fit=crop", category: "Tools" },
    { id: "t4", name: "Digital Caliper", price: 1899, image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?q=80&w=500&auto=format&fit=crop", category: "Tools" },
  ],
};

const categoryDisplayNames: Record<string, string> = {
  "fixed-wings": "Fixed Wings",
  "drone-parts": "Drone Parts",
  "miniatures": "Miniatures",
  "tools": "Tools",
};

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  if (!categoryId || !productsData[categoryId as keyof typeof productsData]) {
    return (
      <>
        <Navbar />
        <div className="container min-h-screen px-4 py-16 mx-auto">
          <h1 className="mb-8 text-3xl font-bold">Category Not Found</h1>
          <p className="mb-6 text-gray-500">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const products = productsData[categoryId as keyof typeof productsData];
  const categoryName = categoryDisplayNames[categoryId] || categoryId;

  return (
    <>
      <Navbar />
      <div className="container min-h-screen px-4 py-16 mx-auto">
        <div className="flex flex-col items-start mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
            <p className="mt-2 text-gray-600">Browse our selection of high-quality {categoryName.toLowerCase()}</p>
          </div>
          <div className="flex mt-4 space-x-2 md:mt-0">
            <Button variant="outline" className="hidden md:block">
              Filter
            </Button>
            <select className="px-4 py-2 bg-white border rounded-md appearance-none h-10 text-sm font-medium">
              <option value="">Sort by: Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;