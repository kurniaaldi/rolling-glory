"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Head from "next/head";
import { getProductDetail } from "@/utils/api";
import RatingStars from "@/components/rating";
import SpecialIcons from "@/components/specialIcon";
import StockStatus from "@/components/stockStatus";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const { slug } = params;
  const [product, setProduct] = useState<any>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (slug) {
        try {
          const data = await getProductDetail(slug);
          setProduct(data?.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [slug]);

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // Implementasi logic API call untuk update wishlist disini
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!product?.attributes) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <>
      <Head>
        <title>{product?.attributes?.name} - Rolling Glory</title>
        <meta name="description" content={product?.attributes?.description} />
        <meta property="og:title" content={product?.attributes?.name} />
        <meta
          property="og:description"
          content={product?.attributes?.description}
        />
        <meta property="og:image" content={product?.attributes?.image} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product?.attributes?.images?.[0]}
              alt={product?.attributes?.name}
              className="w-full h-96 object-contain rounded-lg border"
            />

            <SpecialIcons
              isNew={product?.attributes?.isNew === 1}
              rating={product?.attributes?.rating}
              numOfReviews={product?.attributes?.numOfReviews}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">
                {product?.attributes?.name}
              </h1>
              <button
                onClick={toggleWishlist}
                className="p-2 hover:text-red-500 transition-colors"
              >
                {isInWishlist ? "❤️" : "🤍"}
              </button>
            </div>

            <div className="space-y-2">
              <RatingStars rating={product?.attributes?.rating} />
              <StockStatus stock={product?.attributes?.stock} />
              <p className="text-2xl font-semibold">
                Rp {product?.attributes?.points}
              </p>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p>{product?.attributes?.description}</p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Details</h4>
                <ul className="space-y-1">
                  <li>Category: {product?.attributes?.category}</li>
                  <li>Weight: {product?.attributes?.weight} kg</li>
                  <li>Dimensions: {product?.attributes?.dimensions}</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Reviews ({product?.attributes?.reviewCount})
                </h4>
                <p>Average Rating: {product?.attributes?.rating}/5</p>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={product?.attributes?.stock === 0}
            >
              {product?.attributes?.stock > 0 ? "Add to Cart" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
