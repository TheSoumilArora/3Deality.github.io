import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  const categories = [
    { name: "Fixed Wings", path: "/category/fixed-wings" },
    { name: "Drone Parts", path: "/category/drone-parts" },
    { name: "Miniatures", path: "/category/miniatures" },
    { name: "Tools", path: "/category/tools" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-purple-700">3Deality</span>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        )}

        {!isMobile ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-purple-700">
                  Products <ChevronDown className="w-4 h-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.path} asChild>
                      <Link to={category.path} className="w-full">
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/upload" className="text-gray-600 hover:text-purple-700">
                Upload Model
              </Link>
              <Link to="/track" className="text-gray-600 hover:text-purple-700">
                Track Order
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-purple-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-white bg-purple-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-white bg-purple-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-purple-700">3Deality</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <Link to="/" className="px-2 py-2 hover:bg-gray-100 rounded-md">Home</Link>
                  
                  {/* Mobile Categories */}
                  <div className="px-2 py-2">
                    <p className="font-medium mb-2">Products</p>
                    <div className="pl-4 flex flex-col space-y-2">
                      {categories.map((category) => (
                        <Link 
                          key={category.path} 
                          to={category.path} 
                          className="py-1 hover:bg-gray-100 rounded-md"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <Link to="/upload" className="px-2 py-2 hover:bg-gray-100 rounded-md">Upload Model</Link>
                  <Link to="/track" className="px-2 py-2 hover:bg-gray-100 rounded-md">Track Order</Link>
                  <Link to="/cart" className="px-2 py-2 hover:bg-gray-100 rounded-md">Cart</Link>
                  <Link to="/signin">
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700 w-full">Sign In</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;