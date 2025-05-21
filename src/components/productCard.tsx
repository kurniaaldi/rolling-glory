import Link from "next/link";
import RatingStars from "./rating";
import SpecialIcons from "./specialIcon";
import StockStatus from "./stockStatus";
import { useState } from "react";

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
  const [hover, setHover] = useState<number | null>();
  return (
    <div
      onMouseEnter={() => setHover(product.id)}
      onMouseLeave={() => setHover(null)}
      className="relative overflow-hidden border border-[#D8D8D8] rounded-lg hover:shadow-lg transition-shadow min-w-[250px] h-[420px] p-5"
    >
      {product.stock === 0 && (
        <div className="w-full h-full absolute bg-[#E1E8EE] top-0 left-0 opacity-75" />
      )}
      {hover && (
        <div className="w-full h-full absolute bg-[#74B71B] top-0 left-0 opacity-95 z-20">
          <div className="h-full flex flex-col justify-evenly items-center">
            <h3 className="text-base text-white">{product.name}</h3>
            <Link href={`/products/${product.id}`} className="block">
              <button className="cursor-pointer h-9 w-52 border border-white rounded-full text-white">
                View Detail
              </button>
            </Link>
          </div>
        </div>
      )}
      <StockStatus stock={product.stock} hover={hover} />

      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-[265px] object-contain mt-4"
      />
      <div className="flex justify-between items-start">
        <h3 className="text-base">{product.name}</h3>
        <SpecialIcons
          isNew={product?.isNew === 1}
          rating={product.rating}
          numOfReviews={product.numOfReviews}
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src="./assets/point.svg" />
            <p className="text-sm text-[#74B71B]">
              {product.points.toLocaleString()} Points
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RatingStars rating={product.rating} />
            <p className="text-xs text-gray-400">
              {product.numOfReviews} reviews
            </p>
          </div>
        </div>
        {product?.isWishlist ? (
          <div className="cursor-pointer z-30">
            <img src="./assets/like.svg" className="w-14" />
          </div>
        ) : (
          <div className="cursor-pointer z-30">
            <img src="./assets/unlike.svg" className="w-14" />
          </div>
        )}
      </div>
    </div>
  );
}
