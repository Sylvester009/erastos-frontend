"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import { createBook, type CreateBookInput } from "../services/books";
import type { AddMode } from "../types/book";

const inputClassName =
  "mt-2 w-full rounded-[3px] border border-[#d9cfc1] bg-[#fffdfa] px-3 py-3 text-sm text-[#29231e] outline-none transition placeholder:text-[#b7aa99] focus:border-[#9d6d43] focus:ring-2 focus:ring-[#9d6d43]/15";

const labelClassName =
  "block text-[11px] font-medium uppercase tracking-[.08em] text-[#81766b] [font-family:var(--font-dm-mono)]";

export default function AddBookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Log in before adding a book.");
      return;
    }

    const formData = new FormData(form);
    const optionalString = (name: string): string | null => {
      const value = String(formData.get(name) ?? "").trim();
      return value || null;
    };
    const pageCountValue = String(formData.get("page_count") ?? "").trim();
    const bookshelfIDValue = String(formData.get("bookshelf_id") ?? "").trim();
    const addMode = String(formData.get("add_mode") ?? "");

    const book: CreateBookInput = {
      title: String(formData.get("title") ?? "").trim(),
      authors: String(formData.get("authors") ?? "")
        .split("\n")
        .map((author) => author.trim())
        .filter(Boolean),
      cover_url: optionalString("cover_url"),
      description: optionalString("description"),
      page_count: pageCountValue ? Number(pageCountValue) : null,
      published_date: optionalString("published_date"),
      publisher: optionalString("publisher"),
      isbn: optionalString("isbn"),
      add_mode: addMode as AddMode,
      volume_id: optionalString("volume_id"),
      bookshelf_id: Number(bookshelfIDValue),
    };

    setIsSubmitting(true);
    try {
      await createBook(token, book);
      toast.success("Book added to your library.");
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not add the book.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_88%_10%,#f6ecdd_0,transparent_24rem),#fbf9f5]">
      <header className="mx-auto flex h-[65px] max-w-[1270px] items-center justify-between border-b border-[#e7dfd3] px-5 sm:h-[74px] sm:px-[42px]">
        <Link
          className="flex items-center gap-[9px] text-[22px] font-semibold tracking-[-1.4px] text-[#29231e] no-underline"
          href="/"
          aria-label="Elastos library home"
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

      <section className="mx-auto max-w-[850px] px-5 py-12 sm:px-10 sm:py-16">
        <p className="mb-3 text-[11px] uppercase tracking-[.09em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
          Grow your collection
        </p>
        <h1 className="m-0 text-[clamp(38px,5vw,58px)] font-semibold leading-tight tracking-[-2px] [font-family:var(--font-playfair)]">
          Add a book
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#81766b]">
          Add the book details below. You can leave optional information blank.
        </p>

        <form
          className="mt-9 rounded-[4px] border border-[#e7dfd3] bg-[#fffdfa]/80 p-5 shadow-[0_12px_35px_rgba(67,45,25,.06)] sm:p-8"
          onSubmit={addBook}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className={`${labelClassName} sm:col-span-2`}>
              Title <span className="text-[#9c4e41]">*</span>
              <input
                className={inputClassName}
                name="title"
                type="text"
                autoComplete="off"
                placeholder="Book title"
                required
              />
            </label>

            <label className={`${labelClassName} sm:col-span-2`}>
              Authors <span className="text-[#9c4e41]">*</span>
              <textarea
                className={`${inputClassName} min-h-24 resize-y`}
                name="authors"
                placeholder={"One author per line"}
                required
              />
            </label>

            <label className={labelClassName}>
              Add method <span className="text-[#9c4e41]">*</span>
              <select className={inputClassName} name="add_mode" defaultValue="MANUAL" required>
                <option value="MANUAL">Manual</option>
                <option value="SCAN">Scanned</option>
                <option value="SEARCH">Search</option>
              </select>
            </label>

            <label className={labelClassName}>
              Bookshelf ID <span className="text-[#9c4e41]">*</span>
              <input
                className={inputClassName}
                name="bookshelf_id"
                type="number"
                min="1"
                defaultValue="1"
                required
              />
            </label>

            <label className={labelClassName}>
              ISBN
              <input className={inputClassName} name="isbn" type="text" placeholder="ISBN" />
            </label>

            <label className={labelClassName}>
              Publisher
              <input className={inputClassName} name="publisher" type="text" placeholder="Publisher" />
            </label>

            <label className={labelClassName}>
              Published date
              <input className={inputClassName} name="published_date" type="text" placeholder="e.g. 1937 or 1937-09-21" />
            </label>

            <label className={labelClassName}>
              Page count
              <input className={inputClassName} name="page_count" type="number" min="1" placeholder="Number of pages" />
            </label>

            <label className={`${labelClassName} sm:col-span-2`}>
              Cover image URL
              <input className={inputClassName} name="cover_url" type="url" placeholder="https://" />
            </label>

            <label className={`${labelClassName} sm:col-span-2`}>
              Volume ID
              <input className={inputClassName} name="volume_id" type="text" placeholder="Optional external volume ID" />
            </label>

            <label className={`${labelClassName} sm:col-span-2`}>
              Description
              <textarea
                className={`${inputClassName} min-h-28 resize-y`}
                name="description"
                placeholder="Short description of the book"
              />
            </label>
          </div>

          <div className="mt-7 border-t border-[#e7dfd3] pt-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="cursor-pointer rounded-[3px] border-0 bg-[#9d6d43] px-5 py-3 text-[13px] font-semibold text-[#fffaf4] transition hover:bg-[#83572f] disabled:cursor-wait disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding book..." : "Add to library"}
              </button>
              <Link
                className="rounded-[3px] px-4 py-3 text-[13px] font-medium text-[#81766b] no-underline transition hover:bg-[#f1ece5]"
                href="/"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}