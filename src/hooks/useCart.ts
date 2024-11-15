// useCart.ts
import { useState, useEffect } from "react";
import { getCartFromStorage, saveCartToStorage } from "../lib/utils";
import { Cart, CartItem } from "../types/Cart";
import { Product } from "../types/Product";
const CART_STORAGE_KEY = "cart";
const useCart = () => {
   const [cart, setCart] = useState<Cart>({
     items: [],
     totalItems: 0,
     totalPrice: 0,
   });

 useEffect(() => {
   const storedCart = localStorage.getItem(CART_STORAGE_KEY);
   console.log('stored',storedCart)
   if (storedCart) {
     setCart(JSON.parse(storedCart));
   }
 }, []);

 // Function to save cart to localStorage and log it
 const saveCartToStorage = (updatedCart: Cart) => {
   localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
   console.log("Cart saved to localStorage:", updatedCart);
 };

 // Update localStorage whenever cart changes
 useEffect(() => {
   saveCartToStorage(cart);
 }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product.id === product.id
      );

      let updatedItems: CartItem[];
      if (existingItem) {
        // If the item already exists, update its quantity and totalPrice
        updatedItems = prevCart.items.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * product.price,
              }
            : item
        );
      } else {
        // Add a new item to the cart
        updatedItems = [
          ...prevCart.items,
          { product, quantity: 1, totalPrice: product.price },
        ];
      }

      // Calculate the updated total items and total price for the cart
      const totalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return { items: updatedItems, totalItems, totalPrice };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.product.id !== productId
      );
      return { ...prevCart, items: updatedItems };
    });
  };

  const clearCart = () => setCart({ items: [], totalItems: 0, totalPrice: 0 });

  return { cart, addToCart, removeFromCart, clearCart };
};

export default useCart;
