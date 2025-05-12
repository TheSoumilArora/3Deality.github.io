import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem({ id, name, price, image, category });
  };
  
  return (
    <Card className="overflow-hidden transition-transform duration-300 hover:shadow-md hover:scale-[1.02]">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="inline-block px-2 py-1 mb-2 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
          {category}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
        <p className="text-xl font-bold text-purple-700">₹{price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Link to={`/products/${id}`} className="flex-1 mr-2">
          <Button variant="outline" className="w-full border-gray-300">
            View
          </Button>
        </Link>
        <Button 
          className="flex-1 bg-purple-600 hover:bg-purple-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;