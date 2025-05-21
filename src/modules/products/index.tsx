"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import { Product } from "@/interface";
import Pagination from "@/components/pagination";
import { getProducts, postProductWishlist } from "@/utils/api";

interface Meta {
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
  totalPages: number;
}
interface GiftAttributes {
  id: number;
  name: string;
  info: string;
  description: string;
  points: number;
  slug: string;
  stock: number;
  images: string[];
  isNew: number;
  rating: number;
  numOfReviews: number;
  isWishlist: number;
}

interface GiftData {
  id: string;
  type: string;
  attributes: GiftAttributes;
}

interface ModuleProducts {
  meta: Meta;
  data: GiftData[];
}

export default function ModuleProduct({ data, meta }: ModuleProducts) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "rating">("newest");
  const [currentPage, setCurrentPage] = useState(meta.currentPage);
  const [filters, setFilters] = useState({
    minRating: 0,
    inStock: false,
  });

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleWishlist = async (id: number | string) => {
    try {
      const response = await postProductWishlist(id);
      if (response) {
        const data = await getProducts({ page: currentPage });
        setProducts(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = async (page: number) => {
    if (page >= 1 && page <= meta.totalPages && page !== currentPage) {
      const data = await getProducts({ page });
      setProducts(data.data);

      setCurrentPage(page);
    }
  };

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
            <ProductCard
              key={product.id}
              product={product.attributes}
              handleWishlist={(id) => handleWishlist(id)}
            />
          ))}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Pagination
              meta={meta}
              currentPage={currentPage}
              handlePageChange={(page: number) => handlePageChange(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
