import ModuleProduct from "@/modules/products";
import { getProducts } from "@/utils/api";
import React from "react";

const Page = async () => {
  const data = await getProducts();

  return <ModuleProduct data={data.data} meta={data.meta} />;
};

export default Page;
