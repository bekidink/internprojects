import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cart } from "../types/Cart";
import { Product } from "../types/Product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getCartFromStorage = (): Cart => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { items: [], totalItems: 0, totalPrice: 0 }; // Default cart structure
};

export const saveCartToStorage = (cart: Cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
// searchUtils.ts
const searchableFields: Array<keyof Product> = [
  "title",
  "category",
  "description",
];
export const searchProducts = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm) return products;

  const lowercasedTerm = searchTerm.toLowerCase();
  
  return products.filter((product) =>
    searchableFields.some((field) =>
      product[field]?.toString().toLowerCase().includes(lowercasedTerm)
    )
  );
};
