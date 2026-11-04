"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  mark: string;
  cover: string;
  art: string;
  artText?: string;
  synopsis?: string;
  year?: string;
  category?: string;
};

const books = [
  {
    id: "6",
    title: "The Midnight Library",
    author: "Matt Haig",
    mark: "M",
    cover: "bg-[#a8bfca] text-[#173a51]",
    art: "h-[52%] w-[115%] -bottom-[21%] -right-[28%] rotate-[-20deg] bg-[#dce4df]",
  },
  {
    id: "1",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    mark: "A",
    cover: "bg-[#e4d2ab] text-[#6f3d28]",
    art: "-bottom-3 left-4 text-[65px] font-[family-name:var(--font-playfair)] opacity-[.13]",
    artText: "ACHILLES",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    mark: "A",
    cover: "bg-[#cb7a45] text-[#fff3df]",
    art: "-top-7 right-7 size-[85px] rounded-full border border-white/50",
  },
  {
    id: "3",
    title: "The Creative Act",
    author: "Rick Rubin",
    mark: "R",
    cover: "bg-[#242321] text-[#e2c89d]",
    art: "left-12 top-4 size-[170px] rounded-full border border-[#a37753]",
  },
  {
    id: "4",
    title: "Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    mark: "T",
    cover: "bg-[#ccada2] text-[#542f2b]",
    art: "right-4 top-6 text-[180px] leading-[.8] font-[family-name:var(--font-playfair)] opacity-[.16]",
    artText: "T",
  },
  {
    id: "5",
    title: "Pachinko",
    author: "Min Jin Lee",
    mark: "P",
    cover: "bg-[#70867a] text-[#f2ead7]",
    art: "-left-[10%] bottom-5 h-[70px] w-[120%] rotate-[-9deg] bg-[#526a5c]/75",
  },
];

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#fbf9f5] text-[#81766b]">
          <p className="text-[11px] uppercase tracking-[.09em] [font-family:var(--font-dm-mono)]">
            Loading book details...
          </p>
        </main>
      }
    >
      <BookPageContent />
    </Suspense>
  );
}

function BookPageContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const book: Book | undefined = books.find((b) => b.id === params.id);

  if (!book) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fbf9f5] p-5 text-center">
        <div>
          <p className="text-[11px] uppercase tracking-[.09em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
            Elastos library
          </p>
          <h1 className="mt-3 text-4xl [font-family:var(--font-playfair)]">
            This book is not on the shelf.
          </h1>
          <Link
            className="mt-7 inline-block bg-[#9d6d43] px-5 py-3 text-sm font-semibold text-white"
            href="/"
          >
            Back to library
          </Link>
        </div>
      </main>
    );
  }

  function deleteBook() {
    if (window.confirm(`Delete “${book?.title}” from the library?`))
      router.push("/");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_90%,#f1e4d2_0,transparent_25rem),#fbf9f5]">
      <header className="mx-auto flex h-[65px] max-w-[1270px] items-center justify-between border-b border-[#e7dfd3] px-5 sm:h-[74px] sm:px-[42px]">
        <Link
          className="flex items-center gap-[9px] text-[22px] font-semibold tracking-[-1.4px] text-[#29231e] no-underline"
          href="/"
        >
          <span className="relative grid size-[22px] place-items-center rounded-full border-2 border-[#29231e] before:absolute before:h-0.5 before:w-2.5 before:rotate-[-42deg] before:bg-[#29231e] before:content-['']">
            <span className="absolute h-0.5 w-2.5 rotate-[42deg] bg-[#29231e]" />
          </span>
          <span>elastos</span>
        </Link>
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[.08em] text-[#81766b] [font-family:var(--font-dm-mono)]"
        >
          ← Library
        </Link>
      </header>

      <section className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-14 md:grid-cols-[1fr_minmax(280px,390px)_1fr] md:px-[42px] md:py-24">
        <div className="order-2 md:order-1">
          <p className="mb-3 text-[11px] uppercase tracking-[.09em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
            About the book
          </p>
          <h1 className="mb-2 text-[clamp(38px,4vw,56px)] font-semibold leading-[.98] tracking-[-2px] [font-family:var(--font-playfair)]">
            {book.title}
          </h1>
          <p className="text-[17px] text-[#81766b]">by {book.author}</p>
          <p className="mt-8 max-w-sm text-[15px] leading-7 text-[#554c44]">
            {book.synopsis}
          </p>
          <dl className="mt-9 grid max-w-sm grid-cols-2 gap-y-5 border-t border-[#e7dfd3] pt-6 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[.08em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
                Published
              </dt>
              <dd className="mt-1 font-medium">{book.year}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[.08em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
                Shelf
              </dt>
              <dd className="mt-1 font-medium">{book.category}</dd>
            </div>
          </dl>
        </div>

        <div className="order-1 mx-auto w-full max-w-[390px] md:order-2">
          <div
            className={`relative aspect-[.69/1] w-full overflow-hidden rounded-[3px_8px_8px_3px] shadow-[18px_25px_28px_rgba(67,45,25,.22),-7px_10px_12px_rgba(67,45,25,.1)] ${book.cover}`}
          >
            <span className="absolute inset-y-0 left-0 z-20 w-[18px] border-r border-white/25 bg-black/15" />
            <span className={`absolute ${book.art}`}>{book.artText}</span>
            <span className="absolute inset-[40px_42px_35px_52px] z-10 flex flex-col justify-between">
              <i className="text-[55px] font-medium not-italic leading-none [font-family:var(--font-playfair)]">
                {book.mark}
              </i>
              <b className="max-w-[82%] text-[clamp(32px,4vw,50px)] font-semibold leading-[.98] tracking-[-1.5px] [font-family:var(--font-playfair)]">
                {book.title}
              </b>
            </span>
          </div>
          <p className="mt-5 text-center text-[10px] uppercase tracking-[.12em] text-[#a59687] [font-family:var(--font-dm-mono)]">
            Elastos library collection
          </p>
        </div>

        <aside className="order-3 border-t border-[#e7dfd3] pt-7 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <p className="mb-4 text-[11px] uppercase tracking-[.09em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
            Manage this book
          </p>
          <p className="mb-7 text-sm leading-6 text-[#81766b]">
            Make changes to this entry or remove it from your library.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${book.id}/update-book`}
              className="mt-6 inline-block rounded-[3px] bg-[#9d6d43] px-[18px] py-[14px] text-[13px] font-semibold text-[#fffaf4] no-underline transition hover:-translate-y-0.5 hover:bg-[#83572f] sm:mt-0"
            >
              Update book
            </Link>
            <button
              onClick={deleteBook}
              className="cursor-pointer rounded-[3px] border border-[#d9b4a8] bg-transparent px-4 py-3 text-[13px] font-semibold text-[#9c4e41] transition hover:bg-[#fbefea]"
            >
              Delete book
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}
