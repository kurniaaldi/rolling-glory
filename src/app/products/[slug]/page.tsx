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
    openGraph: {
      title: data?.data?.attributes?.name,
      description: data?.data?.attributes?.description,
      images: [
        {
          url: data?.data?.attributes?.images?.[0],
          width: 1200,
          height: 630,
          alt: data?.data?.attributes?.name,
        },
      ],
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL_CLIENT}/${(await params).slug}`,
    },
  };
}

const Page = async ({ params }: Props) => {
  const data = await getProductDetail((await params).slug);
  return <ProductDetail data={data.data} />;
};

export default Page;
