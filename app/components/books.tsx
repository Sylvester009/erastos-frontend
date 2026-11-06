"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBooks } from "../services/books";
import type { Book } from "../types/book";
import toast from "react-hot-toast";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setHasToken(false);
      setIsLoading(false);
      return;
    }

    let isActive = true;
    getBooks(token)
      .then((result) => {
        if (isActive) setBooks(result);
      })
      .catch((error: unknown) => {
        if (!isActive) return;
        toast.error(
          error instanceof Error ? error.message : "Could not load your books.",
        );
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  if (isLoading) {
    return <p className="mt-8 text-sm text-[#81766b]">Loading your books...</p>;
  }

  if (!hasToken) {
    return <p className="mt-8 text-sm text-[#81766b]">Log in to see your books.</p>;
  }

  return (
    <>
      <div
        className="mt-[53px] flex gap-7 border-b border-[#e7dfd3] sm:mt-[72px]"
        role="tablist"
        aria-label="Book collection"
      >
        <button
          key="My books"
          role="tab"
          className={`relative cursor-pointer border-0 bg-transparent px-px pb-[15px] text-[14px] text-[#81766b] font-semibold text-[#29231e] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-[#9d6d43]`}
        >
          My books
          <small className="ml-[7px] text-[10px] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
            {books.length}
          </small>
        </button>
      </div>

      <section
        className="grid grid-cols-2 gap-x-[13px] gap-y-10 pt-[34px] sm:grid-cols-3 sm:gap-x-[31px] sm:gap-y-[57px] sm:pt-11"
        aria-live="polite"
      >
        {books.map((book, index) => {
          let art =
            "h-[52%] w-[115%] -bottom-[21%] -right-[28%] rotate-[-20deg] bg-[#dce4df]";
          let artText =
            book.title.length > 10
              ? book.title.substring(0, 10) + "..."
              : book.title;
          let mark = book.publisher
            ? book.publisher.charAt(0).toUpperCase()
            : "N/A";
          let cover = book.cover_url
            ? `bg-[url(${book.cover_url})] bg-cover bg-center text-[#fffaf4]`
            : "bg-[#a8bfca] text-[#173a51]";

          return (
            <article className="relative min-w-0" key={book.id}>
              <Link
                href={`/${book.id}`}
                aria-label={`View details for ${book.title}`}
                className={`group relative block aspect-[1.33/1] w-full overflow-hidden rounded-[2px_5px_5px_2px] border-0 text-left shadow-[8px_12px_13px_rgba(67,45,25,.17),-5px_8px_7px_rgba(67,45,25,.08)] transition duration-[250ms] hover:-translate-y-[7px] hover:rotate-0 hover:scale-[1.015] hover:shadow-[11px_17px_18px_rgba(67,45,25,.2)] ${index % 2 ? "rotate-[2.4deg]" : "rotate-[-3deg]"} ${cover}`}
              >
                <span className="absolute inset-y-0 left-0 z-20 w-3 border-r border-white/25 bg-black/15" />
                <span className={`absolute ${art}`}>{artText}</span>
                <span className="absolute inset-[16px_15px_14px_20px] z-10 flex flex-col justify-between sm:inset-[22px_25px_19px_29px]">
                  <i className="text-[27px] font-medium not-italic leading-none [font-family:var(--font-playfair)] sm:text-[35px]">
                    {mark}
                  </i>
                  <b className="max-w-[73%] text-[16px] font-semibold leading-[1.02] tracking-[-.8px] [font-family:var(--font-playfair)] sm:text-[clamp(17px,2vw,27px)]">
                    {book.title}
                  </b>
                </span>
              </Link>

              <div className="px-[5px] pt-[19px] sm:pt-6">
                <h2 className="m-0 text-[14px] font-semibold leading-[1.25] tracking-[-.2px] [font-family:var(--font-playfair)] sm:text-[17px]">
                  {book.title}
                </h2>
                <p className="mb-0 mt-1.5 text-[12px] text-[#81766b]">
                  {book.authors.join(", ")}
                </p>
              </div>
              <span className="absolute bottom-px right-1 hidden text-[10px] text-[#b7aa99] [font-family:var(--font-dm-mono)] sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          );
        })}
        {books.length === 0 && (
          <p className="col-span-full py-10 text-[21px] font-medium text-[#81766b] [font-family:var(--font-playfair)]">
            Your personal shelf is waiting for its first book.
          </p>
        )}
      </section>
    </>
  );
}
