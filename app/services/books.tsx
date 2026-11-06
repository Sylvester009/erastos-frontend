import type { Book } from "../types/book";

export type CreateBookInput = Omit<Book, "id" | "created_at" | "updated_at">;

const apiBaseURL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

const apiUrl = (path: string) =>
  `${apiBaseURL.replace(/\/+$/, "")}${path}`;

export const getBooks = async (token: string): Promise<Book[]> => {
  const response = await fetch(apiUrl("/books"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not load books (HTTP ${response.status}).`);
  }

  return response.json();
};

export const createBook = async (
  token: string,
  book: CreateBookInput,
): Promise<Book> => {
  const response = await fetch(apiUrl("/books"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    let message = `Failed to create book (HTTP ${response.status}).`;
    try {
      const errorBody: { message?: unknown } = await response.json();
      if (typeof errorBody.message === "string" && errorBody.message) {
        message = errorBody.message;
      }
    } catch {
      // Use the status-based message if the response isn't JSON.
    }
    throw new Error(message);
  }

  return response.json();
};


export const updateBook = async (
  token: string,
  book: CreateBookInput,
  bookId: string,
): Promise<Book> => {
  const response = await fetch(apiUrl(`/books/${encodeURIComponent(bookId)}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    let message = `Failed to create book (HTTP ${response.status}).`;
    try {
      const errorBody: { message?: unknown } = await response.json();
      if (typeof errorBody.message === "string" && errorBody.message) {
        message = errorBody.message;
      }
    } catch {
      // Use the status-based message if the response isn't JSON.
    }
    throw new Error(message);
  }

  return response.json();
};


export const getBookById = async (token: string, bookId: string): Promise<Book> => {
  const response = await fetch(apiUrl(`/books/${encodeURIComponent(bookId)}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not load book (HTTP ${response.status}).`);
  }

  return response.json();
};

export const deleteBook = async (
  token: string,
  bookId: string,
): Promise<void> => {
  const response = await fetch(apiUrl(`/books/${encodeURIComponent(bookId)}`), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not delete book (HTTP ${response.status}).`);
  }
};
