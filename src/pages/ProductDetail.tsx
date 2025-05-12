import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProductDetailProps {}

// This would normally come from an API call
const getProductById = (id: string) => {
  const products = [
    {
      id: "1",
      name: "3D Printed RC Airplane Wing",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1615554952178-1db132df8656?q=80&w=500&auto=format&fit=crop",
      category: "Fixed Wings",
      description: "High-quality 3D printed RC airplane wing designed for optimal aerodynamics and durability. Made with premium materials for enhanced performance.",
      specifications: {
        material: "PLA+",
        weight: "320g",
        wingspan: "1200mm",
        compatibleWith: "Most standard RC airplane models",
        printQuality: "High resolution 0.1mm layer height",
        finishType: "Smooth sanded finish"
      },
      features: [
        "Lightweight but durable construction",
        "Optimized for maximum lift",
        "Designed for easy assembly",
        "Compatible with standard mounting hardware",
        "Customizable color options available"
      ],
      stock: 15
    },
    {
      id: "2",
      name: "Custom Drone Frame",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=500&auto=format&fit=crop",
      category: "Drone Parts",
      description: "A sturdy and lightweight drone frame designed for FPV racing and freestyle flying. Perfect for both beginners and professional drone enthusiasts.",
      specifications: {
        material: "Carbon Fiber Reinforced Nylon",
        weight: "120g",
        size: "5 inch",
        mountingHoles: "Standard 30.5mm x 30.5mm",
        armThickness: "4mm",
        compatibleWith: "Most 5-inch propellers and motors"
      },
      features: [
        "Crash-resistant design",
        "Streamlined for reduced air resistance",
        "Integrated power distribution",
        "Protected electronic mounting areas",
        "Adjustable camera mount angle"
      ],
      stock: 8
    }
  ];

  return products.find(product => product.id === id);
};

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  if (!productId) {
    return <div>Product ID not provided</div>;
  }

  const product = getProductById(productId);
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Maximum available quantity reached");
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex text-sm text-gray-500">
            <li><Link to="/" className="hover:text-purple-700">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link to="/products" className="hover:text-purple-700">Products</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link to={`/category/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-purple-700">{product.category}</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full aspect-square"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{product.name}</h1>
            <div className="flex items-center mt-2 mb-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">(42 reviews)</span>
              </div>
            </div>

            <div className="mt-6 mb-6">
              <h2 className="mb-2 text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</h2>
              <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 
                  ? `In Stock (${product.stock} available)` 
                  : 'Out of Stock'}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="pb-6 mb-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="mr-6">
                  <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="w-10 h-10 text-gray-600 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200"
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 h-10 text-center border-t border-b border-gray-300"
                    />
                    <button
                      type="button"
                      className="w-10 h-10 text-gray-600 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200"
                      onClick={incrementQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button 
                  className="flex-1 h-12 mt-6 text-lg bg-purple-600 hover:bg-purple-700"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <Tabs defaultValue="features">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="mt-4">
                  <ul className="pl-5 space-y-2 list-disc">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specifications" className="mt-4">
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className="grid grid-cols-2 py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="text-gray-600">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4">
                  <div className="space-y-3 text-gray-700">
                    <p>We typically process and ship orders within 2-3 business days.</p>
                    <p>Standard shipping takes 3-5 business days within India.</p>
                    <p>Express shipping options are available at checkout for faster delivery.</p>
                    <p>International shipping is available for select countries.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;