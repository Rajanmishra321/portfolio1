# Portfolio TODO

## Before launch
- [x] **Save work in git** (done: pushed to github.com/Rajanmishra321/portfolio1)
- [x] **Deploy on Vercel**: import the GitHub repo at vercel.com and add these environment variables:
  - `RESEND_API_KEY`: same value as in `.env.local`
  - `NEXT_PUBLIC_SITE_URL`: your live URL, e.g. `https://rajanmishra.vercel.app`
- [x] **Skim the 3 blog posts** in `src/content/blog/` (now live) and fix any details that differ from how you actually built things.
- [x] **Add a profile photo** (done)

## After launch
- [ ] **AI Software Engineer live link**: deploy the project, then add its URL as `live` in `src/data/portfolio.ts` (or send it to Claude). A short demo video is optional.
- [ ] **Add numbers to case-study results** when you can find them (users, partners, students, time saved). Edit `results` in `src/data/portfolio.ts`.
- [ ] **GitHub cleanup**: pin your best repos, write READMEs with screenshots and live links, and add a profile README.
- [ ] **LinkedIn**: add the portfolio link to your headline or Featured section and share a launch post.
- [x] (Optional) **Rotate the Resend API key**, since it was shared in chat. Update `.env.local` and Vercel.
