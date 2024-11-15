import { Product } from "./Product";

export type CartItem = {
  product: Product;
  quantity: number;
  totalPrice: number; // Optional: Can be calculated as product.price * quantity
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};
