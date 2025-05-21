"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import { ApiResponse, Product } from "@/interface";

export default function ModuleProduct() {
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
      <div className="grid grid-cols-12 gap-16 mb-5">
        <div className="col-span-3 flex flex-col gap-4 w-full">
          <div className="w-full flex items-center justify-between h-10">
            <p className="text-[#3C3C3F] text-[17px] font-bold">Filter</p>
          </div>
          <hr className="w-full border-[#D8D8D8]" />
        </div>
        <div className="col-span-9 flex flex-col gap-4 w-full">
          <div className="w-full flex items-center justify-between h-10">
            <p className="text-[#3C3C3F] text-[17px] font-bold">Product List</p>
            <div className="flex items-center gap-4">
              <label className="text-[#888888] text-[17px]">Urutkan</label>

              <select
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "rating")
                }
                className="p-2 border border-[#888888] text-[#888888] w-40 rounded-full"
              >
                <option value="newest">Terbaru</option>
                <option value="rating">Ulasan Terbaik</option>
              </select>
            </div>
          </div>
          <hr className="w-full border-[#D8D8D8]" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-16">
        <div className="mb-6 space-y-4 col-span-3">
          <div className="flex flex-col gap-4 border border-[#D8D8D8] rounded p-4">
            <label className="flex items-center justify-between gap-2 text-[#888888]">
              Rating 4+
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
            </label>

            <label className="flex items-center justify-between gap-2 text-[#888888]">
              Stok Tersedia
              <input
                type="checkbox"
                onChange={(e) =>
                  setFilters({ ...filters, inStock: e.target.checked })
                }
                className="w-4 h-4"
              />
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
