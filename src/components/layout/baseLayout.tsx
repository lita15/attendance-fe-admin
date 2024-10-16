import { ReactNode } from "react";
import { Sidebar } from "../molecules/sidebar";
import Navbar from "../molecules/navbar";

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <section className={`flex`}>
      <Sidebar />
      <main className="md:ml-64 w-full">
        <Navbar />
        <main className="px-10 py-20 bg-white text-black min-h-screen">
          {children}
        </main>
      </main>
    </section>
  );
}
