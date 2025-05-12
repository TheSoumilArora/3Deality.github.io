import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  isCustomPrint?: boolean;
  printSettings?: {
    quality: string;
    fileUnit: string;
    rotationX: number;
    rotationY: number;
  };
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CART_STORAGE_KEY = "3deality-cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(cartItem => 
        cartItem.id === item.id && 
        (!item.isCustomPrint || JSON.stringify(cartItem.printSettings) === JSON.stringify(item.printSettings))
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        toast.success(`Updated quantity for "${item.name}"`);
        return updatedCart;
      } else {
        // Add new item
        toast.success(`Added "${item.name}" to cart`);
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== itemId);
      toast.info("Item removed from cart");
      return updatedCart;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => {
      return prevCart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    toast.info("Cart cleared");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};