import { Product } from "../Product";

export type ProductListResponse = {
  products: Product[]; // Assuming Product type is already defined
  total: number;
  skip: number;
  limit: number;
};
