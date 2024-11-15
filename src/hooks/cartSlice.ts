import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../types/Cart";
import { Product } from "../types/Product";
import { toast } from "react-toastify";

// Define the initial state for the cart
const initialState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Helper function to get cart data from localStorage
const getCartFromLocalStorage = (): Cart => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : initialState;
};
function parseQuantity(quantity: any): number {
  const parsed = parseInt(quantity, 10);
  return isNaN(parsed) || parsed <= 0 ? 1 : parsed;
}
// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    // Add item to cart
    addToCart(state: Cart, action: PayloadAction<{ product: Product, quantity: any }>) {
  const { product, quantity } = action.payload; // Extract product and quantity from action payload
  const parsedQuantity = parseQuantity(quantity); // Parse the quantity safely
  
  const existingItem = state.items.find(
    (item) => item.product.id === product.id
  );

  if (existingItem) {
    // If the product already exists in the cart, increase quantity and recalculate totalPrice
    existingItem.quantity += parsedQuantity;
    existingItem.totalPrice = existingItem.quantity * product.price; // Recalculate the total price
  } else {
    // If it's a new product, add it to the cart with the parsed quantity and its price
    const newCartItem: CartItem = {
      product,
      quantity: parsedQuantity,
      totalPrice: product.price * parsedQuantity,
       // Calculate total price based on quantity
    };
    state.items.push(newCartItem);
  }

  // Recalculate the total items and total price in the cart
  state.totalItems = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
 toast.success("Cart Item Added")
  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
}
  ,
    // Remove item from cart
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );

      // Update cart totals
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
 toast.error("Cart Item Removed");
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Clear all items from cart
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
toast.error("Cart Items Removed");
      // Save to localStorage
      localStorage.removeItem("cart");
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.product.id === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.product.price * item.quantity;
      }
      state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.product.price * item.quantity;
      }
      state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
    },
  
  },
});

// Export the actions
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
