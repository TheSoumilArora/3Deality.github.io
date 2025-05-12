import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { 
  loadRazorpayScript, 
  initializeRazorpayCheckout,
  createRazorpayOrder
} from "@/utils/razorpayUtils";

const Cart = () => {
  const { cart, removeItem, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    
    try {
      // First, load the Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error("Failed to load Razorpay script");
      }

      // Create an order ID from your backend (this would be implemented when you have Vercel backend)
      const orderResponse = await createRazorpayOrder(
        getCartTotal() * 100, // Convert to paise
        `cart-${Date.now()}`
      );

      // Initialize Razorpay checkout
      initializeRazorpayCheckout({
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your key from backend
        amount: getCartTotal() * 100, // in paise
        currency: "INR",
        name: "3Deality",
        description: `Payment for ${cart.length} item(s)`,
        order_id: orderResponse.id,
        handler: function (response) {
          // Handle successful payment
          toast.success("Payment successful!");
          clearCart();
          // In a real app, you would verify this payment on your backend
        },
        prefill: {
          name: "", // These would be filled by the user
          email: "",
          contact: ""
        },
        notes: {
          items: cart.map(item => item.name).join(", ")
        },
        theme: {
          color: "#9333ea" // Purple color
        }
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initialize checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container min-h-screen px-4 py-16 mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Cart</h1>
          <div className="p-8 text-center bg-gray-50 rounded-lg">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="mb-2 text-xl font-semibold text-gray-700">Your cart is empty</h2>
            <p className="mb-6 text-gray-500">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild>
              <Link to="/">Browse Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container min-h-screen px-4 py-16 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Cart</h1>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.id + (item.printSettings ? JSON.stringify(item.printSettings) : '')}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-16 h-16">
                            <img 
                              className="object-cover w-16 h-16 rounded" 
                              src={item.image} 
                              alt={item.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            {item.isCustomPrint && item.printSettings && (
                              <div className="text-xs text-gray-500">
                                Quality: {item.printSettings.quality}, 
                                Unit: {item.printSettings.fileUnit}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 mx-2 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => removeItem(item.id)} 
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end p-4 bg-gray-50">
                <Button 
                  onClick={clearCart}
                  variant="outline" 
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
              <div className="pb-4 mb-4 border-b border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹0.00</span>
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">₹{getCartTotal().toFixed(2)}</span>
              </div>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isProcessing}
                onClick={handleCheckout}
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </Button>
              <p className="mt-4 text-xs text-center text-gray-500">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;