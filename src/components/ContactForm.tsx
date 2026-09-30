"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/actions";

const initial: ContactState = { status: "idle", message: "" };

const field =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={action} className="space-y-4 rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Name</span>
          <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="Tell me about your project or opportunity…"
          className={`${field} resize-y`}
        />
      </label>
      {/* Honeypot for bots */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-6 py-3.5 font-medium text-accent-fg transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`min-h-6 text-sm ${state.status === "error" ? "text-red-400" : "text-emerald-500"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
