import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../hooks/store";
import {
  removeFromCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "../hooks/cartSlice";
import NavBar from "../components/custom_ui/NavBar";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import { Trash } from "lucide-react";
import CartItem from "../components/custom_ui/CartItem";
import BreadCrumb from "../components/custom_ui/BreadCrumb";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const handleIncrease = (item: Product) => {
    dispatch(increaseQuantity(item.id)); // Action to increase quantity in Redux
  };

  const handleDecrease = (item: Product) => {
    dispatch(decreaseQuantity(item.id)); // Action to decrease quantity in Redux
  };

  const handleRemove = (itemId: number) => {
    dispatch(removeFromCart(itemId)); // Action to remove item from Redux
  };
  const handleClear=()=>{
    clearCart()
  }
  const calculateSubtotal = () => {
    return cart.items
      .reduce((total, item) => total + item.totalPrice, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    return calculateSubtotal(); // You can add shipping or discount logic here
  };
  
  return (
    <>
      <NavBar />

      <div className="container mx-auto p-6 mt-20 max-w-7xl">
        <BreadCrumb title={"Cart"} title2="" />

        <div className="flex flex-col md:flex-row justify-between mt-5 space-y-6 md:space-y-0 md:space-x-6">
          {/* Left Side - Cart Items */}
          <div className="md:w-2/3 w-full">
            {cart.items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cart.items.map((item) => (
                  <CartItem  item={item} />
                ))}
              </div>
            )}
            <button
              className="text-red-500 mt-4"
              onClick={() => dispatch(clearCart())}
            >
              Clear
            </button>
          </div>

          {/* Right Side - Total and Subtotal */}
          <div className="md:w-1/3 w-full h-auto bg-gray-100 p-6 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal:</p>
              <p>${calculateSubtotal()}</p>
            </div>

            <div className="flex justify-between font-semibold">
              <p>Total:</p>
              <p>${calculateTotal()}</p>
            </div>
            <div className="mt-4">
              <Link
                to="/checkout"
                className="w-full inline-block bg-blue-500 text-white text-center py-2 rounded-md"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
