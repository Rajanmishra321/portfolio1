---
title: Designing role-based access for a school management system
description: How I approached permissions for six different user roles — from Principal to Parent — in a school IMS built with Next.js, Prisma and PostgreSQL.
date: 2026-09-30
tags: Next.js, Prisma, PostgreSQL, Auth
draft: false
---

When I started building a school management platform, the hardest problem wasn't any single feature — it was **who is allowed to see and do what**.

The platform has six roles: **Principal, Teacher, Class Teacher, Accountant, Student and Parent**. Each one needs a completely different view of the same data. A teacher records attendance for their classes, a parent only sees their own child, and an accountant cares about fees but not test marks.

## Start with the data model, not the UI

It's tempting to begin with dashboards. Instead, I started with the database, because permissions are really questions about relationships:

- Which classes does this teacher teach?
- Which student is this parent linked to?
- Which class is this class teacher responsible for?

With Prisma and PostgreSQL, the role itself is simple:

```prisma
enum Role {
  PRINCIPAL
  TEACHER
  CLASS_TEACHER
  ACCOUNTANT
  STUDENT
  PARENT
}
```

The real work is in the relations — linking teachers to classes and subjects, parents to students, and students to classes — so every permission check can be answered by the data.

## Two layers of checks

I think about access in two layers:

1. **Role checks** — can this *kind* of user use this feature at all? (An accountant can open fee management; a student can't.)
2. **Ownership checks** — can this *specific* user touch this *specific* record? (A teacher can edit marks, but only for their own classes.)

Role checks are easy to centralize. Ownership checks are where most bugs hide, so I keep them on the server, right next to the database query, instead of trusting whatever the UI sends.

## Never trust the frontend

Hiding a button isn't security. Every API route and server action verifies the session and the user's role again before reading or writing data. The UI only decides what to *show*; the server decides what's *allowed*.

## Design for what comes next

The platform is growing — an LMS layer with study materials and AI-powered doubt resolution is being built on top of the core IMS. Because permissions live in the data model and server-side checks, adding new modules means reusing the same rules instead of reinventing them.

## Takeaways

- Model relationships first; permissions follow from them.
- Separate *role* checks from *ownership* checks.
- Enforce everything on the server.
- Keep the design modular so new features inherit the same rules.
