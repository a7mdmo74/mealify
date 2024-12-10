"use client";
import Categories from "@/components/Categories";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Search from "@/components/Search";
import { useAppContext } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { getSavedItems, savedData } = useAppContext();
  return (
    <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary">
      <Header />

      <main className="mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4 w-full h-auto">
        <Hero />
        <Featured />
        <Search />
        <Categories getSavedItems={getSavedItems} savedData={savedData} />
        <Footer />
      </main>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
