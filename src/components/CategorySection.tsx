import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

const categories: Category[] = [
  {
    id: "fixed-wings",
    name: "Fixed Wings",
    description: "Aerodynamic models for RC aircraft enthusiasts",
    image: "https://images.unsplash.com/photo-1599157134318-191be6117dea?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "drone-parts",
    name: "Drone Parts",
    description: "Custom components for drone builders and repairs",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "miniatures",
    name: "Miniatures",
    description: "Detailed figurines and scale models for collectors",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "tools",
    name: "Tools",
    description: "Specialized tools for makers and hobbyists",
    image: "https://images.unsplash.com/photo-1581147036324-c71f53e395f7?q=80&w=500&auto=format&fit=crop",
  },
];

const CategorySection: React.FC = () => {
  return (
    <section id="categories" className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-2 text-3xl font-bold text-center text-gray-900">Shop by Category</h2>
        <p className="mx-auto mb-10 text-center text-gray-600 max-w-2xl">
          Browse our selection of high-quality 3D printed products across various categories
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-0 left-0 p-4 text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;