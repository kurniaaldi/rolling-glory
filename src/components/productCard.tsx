import Link from "next/link";
import RatingStars from "./rating";
import SpecialIcons from "./specialIcon";
import StockStatus from "./stockStatus";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    points: number;
    stock: number;
    images: string[];
    isNew: number;
    rating: number;
    numOfReviews: number;
    isWishlist: number;
    slug: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`} className="block">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <SpecialIcons
            isNew={product?.isNew === 1}
            rating={product.rating}
            numOfReviews={product.numOfReviews}
          />
        </div>

        <div className="mt-2">
          <RatingStars rating={product.rating} />
          <StockStatus stock={product.stock} />
          <p className="text-xl font-semibold mt-2">
            {product.points.toLocaleString()} Points
          </p>
        </div>

        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-contain mt-4"
        />
      </Link>
    </div>
  );
}
