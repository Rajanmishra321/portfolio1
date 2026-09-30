---
title: Running AI-generated code in the browser with WebContainer
description: What I learned building an AI developer tool that generates code with Google Gemini and runs it instantly in the browser using WebContainer.
date: 2026-09-20
tags: AI, Gemini, WebContainer, MERN
draft: false
---

Generating code with an AI model is only half the experience. The magic moment is when that code **runs immediately** — no copying files, no local setup. That's what I set out to build in my AI Software Engineer project.

## The stack

- **MERN** (MongoDB, Express, React, Node.js) for the app itself
- **Google Gemini API** for code generation and suggestions
- **WebContainer** to run a Node.js environment directly in the browser
- **JWT** for authentication and **Redis** for real-time collaboration features

## What WebContainer does

WebContainer runs Node.js *inside the browser tab*. You give it a file tree, and it can install packages and start a dev server — all client-side. The core flow looks like this:

```js
import { WebContainer } from "@webcontainer/api";

const container = await WebContainer.boot();
await container.mount(files); // the generated project

const install = await container.spawn("npm", ["install"]);
await install.exit;

await container.spawn("npm", ["run", "dev"]);
container.on("server-ready", (port, url) => {
  previewFrame.src = url; // show the running app
});
```

## Lessons learned

**1. Structure beats free text.** Code is much easier to use when the AI's output has a predictable shape (for example, a list of files and their contents) rather than a loose block of text you have to parse.

**2. Browser security headers matter.** WebContainer relies on cross-origin isolation, so the server has to send the right `Cross-Origin-Embedder-Policy` and `Cross-Origin-Opener-Policy` headers. Missing them is a common first stumbling block.

**3. Show progress.** Installing packages takes time. Streaming terminal output to the user makes the wait feel intentional instead of broken.

**4. Keep the human in control.** AI output should be a starting point that users can read, edit and re-run — not a black box.

## Why it matters

Tools like this shorten the loop between *idea* and *running app*. Building one taught me a lot about AI APIs, in-browser runtimes, auth and real-time systems — all in a single project.
