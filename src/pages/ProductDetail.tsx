import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../hooks/cartSlice";
import { Product } from "../types/Product";
import useAxios from "../hooks/useAxios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import RatingStars from "../components/custom_ui/RatingStart";
import NavBar from "../components/custom_ui/NavBar";
import BreadCrumb from "../components/custom_ui/BreadCrumb";
// Assuming you have a Product type defined

const ProductDetailPage = () => {
  const { loading, error, data, fetchData } = useAxios();
  const { productId } = useParams();
  
   // Get the productId from the URL params
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string>("");
    const [quantity, setQuantity] = useState(1);

    // Handle quantity change
    const handleIncrease = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    };
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const data: Product = await fetchData({
          method: "GET",
          url: `/products/${productId}`,
        });
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchDataFromAPI();
  }, []);
 const calculateSubtotal = () => {
   return (product?.price!*quantity)
     .toFixed(2);
 };
  if (!product) {
    return <div className="flex items-center justify-center">
      <Loader2 className="justify-center w-4 h-4" color="green"/>
    </div>;
  }
function getDeliveryDateMessage(): string {
  // Get current date
  const currentDate = new Date();

  // Add 15 days to the current date
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(currentDate.getDate() + 15);

  // Define format options with explicit typing
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  // Format the date to get the day of the week and the full date
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    deliveryDate
  );

  return `Order now and get it around ${formattedDate}`;
}
  const handleAddToCart = () => {
    // Create a CartItem object
    const cartItem = {
      product: product,
      quantity: quantity,
       // For now, we assume the quantity is 1
    };
    dispatch(addToCart(cartItem)); // Add to cart
  };
  const handleImageClick = (image: string) => {
    setSelectedImage(image); // Set selected image on thumbnail click
  };
  const isInStock = product.stock > 0; 
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6 max-w-7xl mt-16">
        <BreadCrumb title={product.title} title2="" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="w-full items-start">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-80 object-cover rounded-md border border-gray-500"
            />
            <div className="flex space-x-4 mt-6">
              {product.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer"
                  onClick={() => handleImageClick(image)}
                  style={{
                    border:
                      selectedImage === image
                        ? "2px solid #FFA500"
                        : "2px solid #000",
                  }} // Highlight selected thumbnail
                />
              ))}
            </div>
          </div>
          <div className="w-full py-3 justify-between">
            <h1 className="text-3xl font-semibold text-gray-800">
              {product.title}
            </h1>
            <p className="text-base text-gray-600 mt-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div className="mt-1 ">
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Brand: {product.brand}
              </p>
              <RatingStars rating={product.rating} />
              <p className="text-sm text-gray-500 mt-2">
                Availability:{" "}
                <span className="text-xl font-bold text-green-600"></span>
                {isInStock ? "In Stock" : "Out Stock"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                U-Care Warranty:{" "}
                <span className="text-xl font-bold text-green-600"></span>
                {product.warrantyInformation}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Shipping Information:{" "}
                <span className="text-xl font-bold text-green-600"></span>
                {product.shippingInformation}
              </p>
            </div>
          </div>
          <div className="flex flex-col  py-3 shadow-lg px-3 mx-5 h-96">
            <p className="text-lg text-black mt-2">${calculateSubtotal()}</p>
            <p className="text-lg text-green-600 mt-2">
              {getDeliveryDateMessage()}
            </p>
            <div className="flex space-x-4 mt-6 ">
              <div className="flex items-center space-x-4">
                <button
                  className="px-3 py-1 bg-gray-200 rounded"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex  mt-5 space-x-4">
              <Button
                onClick={handleAddToCart}
                variant="default"
                className="w-full"
              >
                Add to Cart
              </Button>
            </div>
            <div className="flex  mt-5 space-x-4">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="w-full"
              >
                Buy Now
              </Button>
            </div>
            <p className="text-lg text-green-600 mt-2">
              Fastest cross-border delivery
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;

