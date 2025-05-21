"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import RatingStars from "@/components/rating";
import SpecialIcons from "@/components/specialIcon";
import StockStatus from "@/components/stockStatus";
import Carousell from "@/components/carousel";
import { Product } from "@/interface";
import Link from "next/link";

interface ModuleProductDetail {
  data: Product;
}

export default function ProductDetail({ data }: ModuleProductDetail) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setProduct(data);
      setLoading(false);
    }
    setLoading(false);
  }, [data]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!product?.attributes) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="text-[#262626] text-sm flex items-center gap-2">
        <Link href="/">
          <p>List Product </p>
        </Link>
        <span>{">"}</span>
        <p>{product?.attributes?.name}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative w-full items-center justify-center">
          <Carousell images={product?.attributes?.images} />

          <SpecialIcons
            isNew={product?.attributes?.isNew === 1}
            rating={product?.attributes?.rating}
            numOfReviews={product?.attributes?.numOfReviews}
          />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{product?.attributes?.name}</h1>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <RatingStars rating={product?.attributes?.rating} />
              <p className="text-xs text-gray-400">
                {product?.attributes?.numOfReviews} reviews
              </p>
            </div>

            <div className="flex items-center gap-2">
              <img src="/assets/point-light.svg" className="w-5 h-5" />
              <p className="text-2xl text-[#74B71B]">
                {product?.attributes?.points} Poins
              </p>
              <StockStatus stock={product?.attributes?.stock} />
            </div>
          </div>

          <div className="prose max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: product?.attributes?.info,
              }}
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="text-[#838EAB]">Jumlah</p>
            <div className="flex items-center justify-center">
              <button className="w-8 h-9 bg-[#f2f2f4] text-[#525F7F] font-bold text-xl">
                -
              </button>
              <div className="w-8 h-9 bg-white text-center flex items-center justify-center">
                1
              </div>
              <button className="w-8 h-9 bg-[#f2f2f4] text-[#525F7F] font-bold text-xl">
                +
              </button>
            </div>
          </div>

          <div className="w-full flex items-center gap-4 relative z-10">
            {product?.attributes?.isWishlist ? (
              <div className="cursor-pointer z-30">
                <img src="/assets/like.svg" className="h-11" />
              </div>
            ) : (
              <div className="cursor-pointer z-30">
                <img src="/assets/unlike.svg" className="h-11" />
              </div>
            )}
            <button
              className="bg-[#006A4E] w-36 h-11 cursor-pointer text-white py-3 px-6 rounded-full hover:opacity-95 transition-colors"
              disabled={product?.attributes?.stock === 0}
            >
              Reedem
            </button>
            <button className="bg-white w-36 h-11 cursor-pointer text-[#74B71B] border border-[#74B71B] py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">
              {product?.attributes?.stock > 0 ? "Add to Cart" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
      <div className="h-full mt-10 pb-10">
        <div className="h-12 w-40 border border-[#74B71B] border-b-4 border-t-0 border-l-0 border-r-0">
          <p className="text-base text-[#74B71B]">Info produk</p>
        </div>
        <hr className="w-full border-[#D8D8D8]" />
        <div className="my-8">
          <p className="text-xl text-[#006A4E]">Rincian</p>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: product?.attributes?.description,
          }}
        />
      </div>
    </div>
  );
}
