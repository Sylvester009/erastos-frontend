import Link from "next/link";

const inputClassName =
  "mt-2 w-full rounded-[3px] border border-[#d9cfc1] bg-[#fffdfa] px-3 py-3.5 text-sm text-[#29231e] outline-none transition placeholder:text-[#b7aa99] focus:border-[#9d6d43] focus:ring-2 focus:ring-[#9d6d43]/15";

const labelClassName =
  "block text-[11px] font-medium uppercase tracking-[.08em] text-[#81766b] [font-family:var(--font-dm-mono)]";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_12%,#f2e4d1_0,transparent_25rem),#fbf9f5]">
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
          href="/signup"
          className="text-[11px] uppercase tracking-[.08em] text-[#81766b] no-underline transition hover:text-[#9d6d43] [font-family:var(--font-dm-mono)]"
        >
          Create account
        </Link>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-75px)] max-w-[1100px] items-center gap-12 px-5 py-12 sm:px-10 lg:grid-cols-[420px_1fr] lg:gap-20">
        <div className="mx-auto w-full max-w-[440px]">
          <div className="mb-8 lg:hidden">
            <p className="mb-2 text-[11px] uppercase tracking-[.12em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
              Welcome back to your reading room
            </p>
            <h1 className="m-0 text-[clamp(38px,8vw,52px)] font-semibold leading-tight tracking-[-2px] text-[#29231e] [font-family:var(--font-playfair)]">
              Good to see you again.
            </h1>
          </div>
          <div className="rounded-[4px] border border-[#e7dfd3] bg-[#fffdfa]/85 p-6 shadow-[0_16px_45px_rgba(67,45,25,.07)] sm:p-9">
            <p className="mb-2 text-[11px] uppercase tracking-[.1em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
              Pick up where you left off
            </p>
            <h2 className="m-0 text-[32px] font-semibold tracking-[-1.1px] text-[#29231e] [font-family:var(--font-playfair)]">
              Log in
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#81766b]">
              Enter your details to return to your library.
            </p>

            <form className="mt-7 space-y-5">
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
                  autoComplete="current-password"
                  placeholder="Your password"
                  required
                />
              </label>

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-xs normal-case tracking-normal text-[#81766b]">
                  <input
                    className="size-4 accent-[#9d6d43]"
                    type="checkbox"
                    name="remember"
                  />
                  Remember me
                </label>
                <button
                  className="cursor-pointer border-0 bg-transparent p-0 text-xs text-[#8e5e37] underline decoration-[#c8a47f] underline-offset-4 hover:text-[#684326]"
                  type="button"
                >
                  Forgot password?
                </button>
              </div>

              <button
                className="w-full cursor-pointer rounded-[3px] border-0 bg-[#9d6d43] px-5 py-3.5 text-[13px] font-semibold text-[#fffaf4] transition hover:bg-[#83572f]"
                type="button"
              >
                Log in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#81766b]">
              New to elastos?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#8e5e37] underline decoration-[#c8a47f] underline-offset-4 hover:text-[#684326]"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block">
          <p className="mb-4 text-[11px] uppercase tracking-[.12em] text-[#9d6d43] [font-family:var(--font-dm-mono)]">
            A little more reading, a little more wonder
          </p>
          <h1 className="max-w-[520px] text-[clamp(44px,5vw,68px)] font-semibold leading-[1.02] tracking-[-2.8px] text-[#29231e] [font-family:var(--font-playfair)]">
            Your books are right where you left them.
          </h1>
          <p className="mt-5 max-w-[410px] text-[15px] leading-7 text-[#81766b]">
            Revisit your shelves, keep your reading life in order, and make
            space for the story calling your name.
          </p>
          <div className="mt-10 flex items-center gap-3 text-xs text-[#81766b] [font-family:var(--font-dm-mono)]">
            <span className="h-px w-10 bg-[#c8a47f]" />
            YOUR READING ROOM IS READY
          </div>
        </div>
      </section>
    </main>
  );
}