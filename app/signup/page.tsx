"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createUser } from "../services/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const inputClassName =
  "mt-2 w-full rounded-[3px] border border-[#d9cfc1] bg-[#fffdfa] px-3 py-3.5 text-sm text-[#29231e] outline-none transition placeholder:text-[#b7aa99] focus:border-[#9d6d43] focus:ring-2 focus:ring-[#9d6d43]/15";

const labelClassName =
  "block text-[11px] font-medium uppercase tracking-[.08em] text-[#81766b] [font-family:var(--font-dm-mono)]";

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = String(formData.get("username") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);
    try {
      await createUser(username, email, password);
      localStorage.setItem("authUsername", username);
      toast.success("User created successfully!");
      form.reset();
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create user. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_85%_12%,#f2e4d1_0,transparent_25rem),#fbf9f5]">
      <header className="mx-auto flex h-[74px] max-w-[1270px] items-center justify-between border-b border-[#e7dfd3] px-5 sm:px-[42px]">
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
          href="/login"
          className="text-[11px] uppercase tracking-[.08em] text-[#81766b] no-underline transition hover:text-[#9d6d43] [font-family:var(--font-dm-mono)]"
        >
          Log in
        </Link>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-75px)] max-w-[1100px] items-center gap-12 px-5 py-12 sm:px-10 lg:grid-cols-[1fr_420px] lg:gap-20">
        <div className="hidden lg:block">
          <p className="mb-4 text-[11px] uppercase tracking-[.12em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
            A home for your next chapter
          </p>
          <h1 className="max-w-[520px] text-[clamp(44px,5vw,68px)] font-semibold leading-[1.02] tracking-[-2.8px] text-[#29231e] [font-family:var(--font-playfair)]">
            Make room for more good reads.
          </h1>
          <p className="mt-5 max-w-[410px] text-[15px] leading-7 text-[#81766b]">
            Create a personal library, keep track of the books you love, and
            find your next favorite.
          </p>
          <div className="mt-10 flex items-center gap-3 text-xs text-[#81766b] [font-family:var(--font-dm-mono)]">
            <span className="h-px w-10 bg-[#c8a47f]" />
            YOUR READING ROOM AWAITS
          </div>
        </div>

        <div className="mx-auto w-full max-w-[440px]">
          <div className="mb-8 lg:hidden">
            <p className="mb-2 text-[11px] uppercase tracking-[.12em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
              A home for your next chapter
            </p>
            <h1 className="m-0 text-[clamp(38px,8vw,52px)] font-semibold leading-tight tracking-[-2px] text-[#29231e] [font-family:var(--font-playfair)]">
              Create your account
            </h1>
          </div>
          <div className="rounded-[4px] border border-[#e7dfd3] bg-[#fffdfa]/85 p-6 shadow-[0_16px_45px_rgba(67,45,25,.07)] sm:p-9">
            <p className="mb-2 hidden text-[11px] uppercase tracking-[.1em] text-[#9d6d43] [font-family:var(--font-dm-mono)] lg:block">
              Start your collection
            </p>
            <h2 className="m-0 text-[32px] font-semibold tracking-[-1.1px] text-[#29231e] [font-family:var(--font-playfair)]">
              Create account
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#81766b]">
              Sign up to start building your personal library.
            </p>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <label className={labelClassName}>
                Username
                <input
                  className={inputClassName}
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className={labelClassName}>
                Email
                <input
                  className={inputClassName}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className={labelClassName}>
                Password
                <input
                  className={inputClassName}
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  required
                />
              </label>
              <button
                className="w-full cursor-pointer rounded-[3px] border-0 bg-[#9d6d43] px-5 py-3.5 text-[13px] font-semibold text-[#fffaf4] transition hover:bg-[#83572f] disabled:cursor-wait disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#81766b]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#8e5e37] underline decoration-[#c8a47f] underline-offset-4 hover:text-[#684326]"
              >
                Log in
              </Link>
            </p>
          </div>
          <p className="mt-5 text-center text-[11px] leading-5 text-[#a09588]">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  );
}
