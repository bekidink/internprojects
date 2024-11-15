import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../hooks/cartSlice';
import { RootState } from '../../hooks/store';
import { Product } from '../../types/Product';
import { CartItem as Item  }  from '../../types/Cart'
import { Trash } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function CartItem({item}:{item:Item}) {
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
  return (
    <div
      key={item.product.id}
      className="flex flex-col md:flex-row items-center mb-4 p-4 border rounded-lg shadow-sm bg-white space-y-4 md:space-y-0"
    >
      {/* Product details with image */}
      <div className="flex items-center space-x-4 w-full md:w-1/2">
        <img
          src={item.product.thumbnail}
          alt={item.product.title}
          className="h-20 w-20 object-cover rounded-md"
        />
        <div className="flex-1 min-w-0">
          {" "}
          {/* min-w-0 enables truncation */}
          <h2 className="font-semibold text-lg text-gray-800 truncate">
            {item.product.title}
          </h2>
          <p className="text-gray-500">${item.product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity controls and remove button */}
      <div className="flex justify-between items-center w-full md:w-1/2">
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => handleDecrease(item.product)}
          >
            -
          </button>
          <span className="px-2 text-gray-800 font-medium">
            {item.quantity}
          </span>
          <button
            className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => handleIncrease(item.product)}
          >
            +
          </button>
        </div>

        {/* Remove button */}
        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => handleRemove(item.product.id)}
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}
