"use client";

import Link from "next/link";
import { useState } from "react";
import { bookCoverStyles, books } from "./data/book";

const booksWithCovers = books.map((book, index) => {
  const coverStyle = bookCoverStyles[index % bookCoverStyles.length];
  const titleWords = book.title.split(/\s+/).filter(Boolean);
  const significantTitleWords = titleWords.filter(
    (word) => !["a", "an", "the"].includes(word.toLowerCase()),
  );
  const authorWords = (book.authors[0] ?? "").split(/\s+/).filter(Boolean);

  return {
    ...book,
    ...coverStyle,
    mark: `${significantTitleWords[0]?.[0] ?? titleWords[0]?.[0] ?? ""}${authorWords.at(-1)?.[0] ?? ""}`.toUpperCase(),
    artText: authorWords.at(-1)?.toUpperCase() ?? book.title.toUpperCase(),
  };
});

export default function Home() {
  const [activeTab, setActiveTab] = useState("All books");
  const [saved, setSaved] = useState<string[]>(["1", "3"]);
  const visibleBooks =
    activeTab === "My books"
      ? booksWithCovers.filter((book) => saved.includes(book.id))
      : booksWithCovers;

  function toggleBook(id: string) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_88%_10%,#f6ecdd_0,transparent_24rem),#fbf9f5]">
      <header className="mx-auto flex h-[65px] max-w-[1270px] items-center justify-between border-b border-[#e7dfd3] px-5 sm:h-[74px] sm:px-[42px]">
        <a
          className="flex items-center gap-[9px] text-[22px] font-semibold tracking-[-1.4px] text-[#29231e] no-underline"
          href="#top"
          aria-label="Elastos library home"
        >
          <span className="relative grid size-[22px] place-items-center rounded-full border-2 border-[#29231e] before:absolute before:h-0.5 before:w-2.5 before:rotate-[-42deg] before:bg-[#29231e] before:content-['']">
            <span className="absolute h-0.5 w-2.5 rotate-[42deg] bg-[#29231e]" />
          </span>
          <span>elastos</span>
        </a>
        <Link
            href="/login"
          className="flex items-center justify-center size-[35px] cursor-pointer rounded-full border-0 bg-[#e6c6a3] text-[10px] font-bold tracking-[.4px] text-[#5e3c24] shadow-[inset_0_0_0_3px_#f9efdf]"
          aria-label="Open user menu"
        >
          AO
        </Link>
      </header>

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
          <Link
            href="/add-book"
            className="mt-6 inline-block rounded-[3px] bg-[#9d6d43] px-[18px] py-[14px] text-[13px] font-semibold text-[#fffaf4] no-underline transition hover:-translate-y-0.5 hover:bg-[#83572f] sm:mt-0"
          >
            <span className="mr-[5px] align-[-1px] text-[19px] font-normal">
              +
            </span>{" "}
            Add a book
          </Link>
        </div>

        <div
          className="mt-[53px] flex gap-7 border-b border-[#e7dfd3] sm:mt-[72px]"
          role="tablist"
          aria-label="Book collection"
        >
          {["All books", "My books"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={`relative cursor-pointer border-0 bg-transparent px-px pb-[15px] text-[14px] text-[#81766b] ${isActive ? "font-semibold text-[#29231e] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-[#9d6d43]" : ""}`}
              >
                {tab}
                {tab === "All books" && (
                  <small className="ml-[7px] text-[10px] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
                    {books.length}
                  </small>
                )}
              </button>
            );
          })}
        </div>

        <section
          className="grid grid-cols-2 gap-x-[13px] gap-y-10 pt-[34px] sm:grid-cols-3 sm:gap-x-[31px] sm:gap-y-[57px] sm:pt-11"
          aria-live="polite"
        >
          {visibleBooks.map((book, index) => {
            const isSaved = saved.includes(book.id);

            return (
              <article className="relative min-w-0" key={book.id}>
                <Link
                  href={`/${book.id}`}
                  aria-label={`View details for ${book.title}`}
                  className={`group relative block aspect-[1.33/1] w-full overflow-hidden rounded-[2px_5px_5px_2px] border-0 text-left shadow-[8px_12px_13px_rgba(67,45,25,.17),-5px_8px_7px_rgba(67,45,25,.08)] transition duration-[250ms] hover:-translate-y-[7px] hover:rotate-0 hover:scale-[1.015] hover:shadow-[11px_17px_18px_rgba(67,45,25,.2)] ${index % 2 ? "rotate-[2.4deg]" : "rotate-[-3deg]"} ${book.cover}`}
                >
                  <span className="absolute inset-y-0 left-0 z-20 w-3 border-r border-white/25 bg-black/15" />
                  <span className={`absolute ${book.art}`}>{book.artText}</span>
                  <span className="absolute inset-[16px_15px_14px_20px] z-10 flex flex-col justify-between sm:inset-[22px_25px_19px_29px]">
                    <i className="text-[27px] font-medium not-italic leading-none [font-family:var(--font-playfair)] sm:text-[35px]">
                      {book.mark}
                    </i>
                    <b className="max-w-[73%] text-[16px] font-semibold leading-[1.02] tracking-[-.8px] [font-family:var(--font-playfair)] sm:text-[clamp(17px,2vw,27px)]">
                      {book.title}
                    </b>
                  </span>
                </Link>
                <button
                  className="absolute right-2.5 top-2.5 z-30 grid size-[21px] cursor-pointer place-items-center rounded-full border border-current bg-transparent text-[15px] font-normal sm:right-4 sm:top-[15px] sm:size-6 sm:text-base"
                  onClick={() => toggleBook(book.id)}
                  aria-label={`${isSaved ? "Remove" : "Add"} ${book.title} to my books`}
                >
                  {isSaved ? "✓" : "+"}
                </button>
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
          {visibleBooks.length === 0 && (
            <p className="col-span-full py-10 text-[21px] font-medium text-[#81766b] [font-family:var(--font-playfair)]">
              Your personal shelf is waiting for its first book.
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
