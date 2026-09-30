---
title: What I learned improving an existing client codebase
description: Practical lessons from freelancing on Roulocal — understanding unfamiliar code, adding features safely, and using Playwright so nothing breaks.
date: 2026-09-10
tags: Freelance, React, TypeScript, Playwright
draft: false
---

Most tutorials start from an empty folder. Real client work usually doesn't. On **Roulocal**, a French platform connecting local businesses and partners, my job was to improve an application that already existed — and that taught me different skills than building from scratch.

## 1. Read before you write

Before changing anything, I spent time understanding how the app was structured: how data flowed from Firebase into the React components, how different user types were handled, and which parts were most critical. Changing code you don't understand is how regressions happen.

## 2. Build for the user, not the feature list

I built **Admin and Partner portals** for event and partner management. The goal wasn't just "add pages" — it was giving each type of user a focused, structured interface for their own workflows, instead of one screen that tries to serve everyone.

## 3. Small features can save hours

Adding **PDF and CSV export** sounds minor, but for people who manage reports and data every day, it removes a lot of manual work. Some of the most valuable features are the unglamorous ones.

## 4. Tests are your safety net

When you're working inside someone else's codebase, the biggest fear is breaking something you didn't touch. I wrote **automated end-to-end tests with Playwright** for critical workflows, so every change could be checked against real user flows:

```ts
import { test, expect } from "@playwright/test";

test("partner can open their dashboard", async ({ page }) => {
  await page.goto("/login");
  // ...sign in as a partner
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
});
```

A handful of well-chosen E2E tests gives far more confidence than dozens of trivial ones.

## 5. Communicate like a teammate

With an international client, clear written updates matter as much as the code: what changed, why, and what to check. It builds trust and avoids surprises.

## Takeaway

Working on an existing product made me a more careful developer — reading first, changing deliberately, and proving that things still work.
