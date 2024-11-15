import { Product } from "@/src/types/Product";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import useCart from "../../hooks/useCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../hooks/cartSlice";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStart";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem={
      product,
      quantity:1
    }
    dispatch(addToCart(cartItem));
  };
  return (
    
      <Card className="w-full">
        <CardHeader>
          <Link to={`/product/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-40 w-full object-cover rounded-md"
          />
        </Link>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-1">
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500"> <RatingStars rating={product.rating}/> </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          

          <Button variant="default" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </CardFooter>
      </Card>
  );
};
export default ProductCard;
