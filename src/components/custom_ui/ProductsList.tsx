import { Product } from "@/src/types/Product";
import { SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import ProductCard from "./ProductCard";
import PaginationComponent from "./PaginationComponent";
import Pagination from "./PaginationComponent";

type ProductListProps = {
  products: Product[];
  itemsPerPage: number;
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  itemsPerPage = 6,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="mt-20 my-5">
      <div className=" mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* <div className="flex justify-center items-center mt-4 my-3">
        <Button
          variant="secondary"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="px-4">
           {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div> */}
      {/* <PaginationComponent /> */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: SetStateAction<number>) => setCurrentPage(page)} // Pass your page change logic
      />
    </div>
  );
};
export default ProductList;
