# Portfolio TODO

## Before launch
- [ ] **Save work in git**: make the first commit (`git add -A && git commit -m "Initial portfolio"`), then push to a new GitHub repo.
- [ ] **Deploy on Vercel**: import the GitHub repo at vercel.com and add these environment variables:
  - `RESEND_API_KEY`: same value as in `.env.local`
  - `NEXT_PUBLIC_SITE_URL`: your live URL, e.g. `https://rajanmishra.vercel.app`
- [ ] **Skim the 3 blog posts** in `src/content/blog/` (now live) and fix any details that differ from how you actually built things.
- [x] **Add a profile photo** (done)

## After launch
- [ ] **AI Software Engineer demo**: record a 30–60 second screen recording (MP4 or GIF) of the project working. Optionally add a live link or a case study for it.
- [ ] **Add numbers to case-study results** when you can find them (users, partners, students, time saved). Edit `results` in `src/data/portfolio.ts`.
- [ ] **Custom domain**: buy e.g. `rajanmishra.dev` or `.in` and connect it in Vercel. Update `NEXT_PUBLIC_SITE_URL`.
- [ ] **GitHub cleanup**: pin your best repos, write READMEs with screenshots and live links, and add a profile README.
- [ ] **LinkedIn**: add the portfolio link to your headline or Featured section and share a launch post.
- [ ] (Optional) **Rotate the Resend API key**, since it was shared in chat. Update `.env.local` and Vercel.
