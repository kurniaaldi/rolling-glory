import ProductDetail from "@/modules/product-detail";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Rolling Glory - Product List",
  description: "List of products from Rolling Glory",
};

const Page = () => {
  return <ProductDetail />;
};

export default Page;
