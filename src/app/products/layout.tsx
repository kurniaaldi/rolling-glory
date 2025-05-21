import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Metadata } from "next";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

export const metadata: Metadata = {
  title: "Rolling Glory - Product List",
  description: "List of products from Rolling Glory",
};

function Layout(props: Props) {
  const { children } = props;
  return (
    <>
      <Navbar />
      <main className="pt-16 relative w-full h-full min-h-screen">
        {children}
        <div className="absolute bottom-0 left-0 h-1/2 main-layout w-full" />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
