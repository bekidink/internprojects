import React, { useEffect, useState } from "react";
import NavBar from "../components/custom_ui/NavBar";
import ProductList from "../components/custom_ui/ProductsList";
import useAxios from "../hooks/useAxios";
import { ProductListResponse}  from "../types/response/ProductListResponse";
import { searchProducts } from "../lib/utils";

function Dashboard() {
      const { loading, error, data, fetchData } = useAxios();
      const[productsResponse,setProductsResponse]=useState<ProductListResponse>()
      const [searchQuery, setSearchQuery] = useState("");
      useEffect(() => {
        const fetchDataFromAPI = async () => {
          try {
        const data:ProductListResponse =    await fetchData({ method: "GET", url: "/products" });
        setProductsResponse(data)
        console.log(data)
          } catch (error) {
            console.error("Fetch error:", error);
          }
        };

        fetchDataFromAPI();
      }, [fetchData]);
       const filteredProducts = productsResponse
         ? searchProducts(productsResponse.products, searchQuery)
         : [];
  return (
    <div>
      <NavBar onSearch={setSearchQuery} />
      {/* <div className="max-w-7xl w-full flex justify-center items-center"> */}
        {filteredProducts && filteredProducts.length > 0 && (
          <ProductList products={filteredProducts} itemsPerPage={8} />
        )}
      {/* </div> */}
    </div>
  );
}

export default Dashboard;
