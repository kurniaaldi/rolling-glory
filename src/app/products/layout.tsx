import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

function Layout(props: Props) {
  const { children } = props;
  return (
    <>
      <Navbar />
      <main className="pt-16 relative w-full h-full min-h-screen">
        {children}
        <div className="absolute bottom-0 left-0 h-1/2 main-layout w-full" />
      </main>
    </>
  );
}

export default Layout;
