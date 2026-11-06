"use client";

import Header from "./components/header";
import Books from "./components/books";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const addBook = () => {
    const userid: string | null = localStorage.getItem("authUserid");
    if (!userid) {
      toast.error("Login to add Books");
      router.push("/");
    } else {
      router.push("/add-book");
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_88%_10%,#f6ecdd_0,transparent_24rem),#fbf9f5]">
      <Header />

      <section
        className="mx-auto max-w-[1270px] px-5 pb-[60px] pt-[49px] sm:px-[42px] sm:pb-[90px] sm:pt-[74px]"
        id="top"
      >
        <div className="block gap-7 sm:flex sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[.09em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
              Your reading room
            </p>
            <h1 className="m-0 text-[clamp(42px,5.2vw,67px)] font-semibold leading-[.98] tracking-[-2px] sm:tracking-[-2.8px] [font-family:var(--font-playfair)]">
              Find your next
              <br />
              good read.
            </h1>
          </div>
          <button
            onClick={() => addBook()}
            className="mt-6 inline-block rounded-[3px] bg-[#9d6d43] px-[18px] py-[14px] text-[13px] font-semibold text-[#fffaf4] no-underline transition hover:-translate-y-0.5 hover:bg-[#83572f] sm:mt-0"
          >
            <span className="mr-[5px] align-[-1px] text-[19px] font-normal">
              +
            </span>{" "}
            Add a book
          </button>
        </div>

        <Books />
      </section>
    </main>
  );
}
