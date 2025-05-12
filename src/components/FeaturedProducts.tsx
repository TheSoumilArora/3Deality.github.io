import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "3D Printed RC Airplane Wing",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1615554952178-1db132df8656?q=80&w=500&auto=format&fit=crop",
    category: "Fixed Wings"
  },
  {
    id: "2",
    name: "Custom Drone Frame",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=500&auto=format&fit=crop",
    category: "Drone Parts"
  },
  {
    id: "3",
    name: "Detailed Medieval Knight Figurine",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?q=80&w=500&auto=format&fit=crop",
    category: "Miniatures"
  },
  {
    id: "4",
    name: "3D Printed Socket Wrench Set",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1581147536281-9d6230d13f87?q=80&w=500&auto=format&fit=crop",
    category: "Tools"
  },
  {
    id: "5",
    name: "Customizable Drone Propeller",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
    category: "Drone Parts"
  },
  {
    id: "6",
    name: "RC Glider Kit",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1600198146220-ca392a333ef7?q=80&w=500&auto=format&fit=crop",
    category: "Fixed Wings"
  },
  {
    id: "7",
    name: "Fantasy Dragon Sculpture",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1550747528-cdb45925b3f7?q=80&w=500&auto=format&fit=crop",
    category: "Miniatures"
  },
  {
    id: "8",
    name: "3D Printed Hobby Clamp Set",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=500&auto=format&fit=crop",
    category: "Tools"
  }
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="mb-2 text-3xl font-bold text-center text-gray-900">Featured Products</h2>
        <p className="mx-auto mb-10 text-center text-gray-600 max-w-2xl">
          Discover our most popular 3D printed products
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
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
    </section>
  );
};

export default FeaturedProducts;