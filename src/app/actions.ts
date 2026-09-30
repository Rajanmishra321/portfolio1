"use server";

import { profile } from "@/data/portfolio";

export type ContactState = { status: "idle" | "success" | "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get("company")) return { status: "success", message: "Thanks! Your message was sent." };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > 100) return { status: "error", message: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { status: "error", message: "Please enter a valid email address." };
  if (message.length < 10 || message.length > 5000)
    return { status: "error", message: "Message should be between 10 and 5000 characters." };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set — contact form is disabled.");
    return {
      status: "error",
      message: `The form isn't set up yet — please email me directly at ${profile.email}.`,
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? profile.email,
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return { status: "error", message: `Something went wrong. Please email me at ${profile.email}.` };
  }

  return { status: "success", message: "Thanks! Your message was sent — I'll get back to you soon." };
}
