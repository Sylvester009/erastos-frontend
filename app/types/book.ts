export type AddMode = "MANUAL" | "SCAN" | "SEARCH";

export interface BookCoverStyle {
  cover: string;
  art: string;
  artText?: string;
}

export interface Book {
  id: string;
  title: string;
  authors: string[];
  cover_url: string | null;
  description: string | null;
  page_count: number | null;
  published_date: string | null;
  publisher: string | null;
  isbn: string | null;
  add_mode: AddMode;
  volume_id: string | null;
  bookshelf_id: number;
  created_at: string;
  updated_at: string;
}
