"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import ProductCard from "@/components/productCard";

interface ProductAttributes {
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
  description: string;
}

interface Product {
  id: string;
  type: string;
  attributes: ProductAttributes;
}

interface ApiResponse {
  meta: {
    totalItems: number;
    currentPage: number;
    itemPerPage: number;
    totalPages: number;
  };
  data: Product[];
  links: {
    self: string;
    next: string;
    last: string;
  };
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "rating">("newest");
  const [filters, setFilters] = useState({
    minRating: 0,
    inStock: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://recruitment.dev.rollingglory.com/api/v2/gifts?page[number]=1&page[size]=6",
        );
        const data: ApiResponse = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const sortProducts = (products: Product[], type: string) => {
    return [...products].sort((a, b) => {
      if (type === "rating") {
        return b.attributes.rating - a.attributes.rating;
      }
      return b.attributes.id - a.attributes.id;
    });
  };

  const filteredProducts = sortProducts(products, sortBy).filter((product) => {
    const { minRating, inStock } = filters;
    const stockCondition = inStock ? product.attributes.stock > 0 : true;
    return product.attributes.rating >= minRating && stockCondition;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Rolling Glory - Product List</title>
        <meta
          name="description"
          content="List of products from Rolling Glory"
        />
      </Head>

      <div className="grid grid-cols-12 gap-16">
        <div className="mb-6 space-y-4 col-span-3">
          <select
            onChange={(e) => setSortBy(e.target.value as "newest" | "rating")}
            className="w-full p-2 border rounded"
          >
            <option value="newest">Terbaru</option>
            <option value="rating">Ulasan Terbaik</option>
          </select>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minRating: e.target.checked ? 4 : 0,
                  })
                }
                className="w-4 h-4"
              />
              Rating 4+
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFilters({ ...filters, inStock: e.target.checked })
                }
                className="w-4 h-4"
              />
              Stok Tersedia
            </label>
          </div>
        </div>

        <div className="col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product.attributes} />
          ))}
        </div>
      </div>
    </div>
  );
}
