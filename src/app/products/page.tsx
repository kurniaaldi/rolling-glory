import ModuleProduct from "@/modules/products";
import { getProducts } from "@/utils/api";
import React from "react";

const Page = async () => {
  const data = await getProducts({ page: 1 });

  return <ModuleProduct data={data.data} meta={data.meta} />;
};

export default Page;
