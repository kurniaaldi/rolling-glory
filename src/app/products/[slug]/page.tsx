import ProductDetail from "@/modules/product-detail";
import { getProductDetail } from "@/utils/api";
import type { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const data = await getProductDetail(slug);

  return {
    title: data?.data?.attributes?.name,
    description: data?.data?.attributes?.description,
  };
}

const Page = async ({ params }: Props) => {
  const data = await getProductDetail((await params).slug);
  return <ProductDetail data={data.data} />;
};

export default Page;
