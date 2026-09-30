import { profile } from "@/data/portfolio";
import ContactForm from "./ContactForm";
import TiltCard from "./TiltCard";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export default function Contact() {
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: "LinkedIn", value: "Rajan Mishra", href: profile.linkedin, Icon: LinkedInIcon },
    { label: "GitHub", value: "Rajanmishra321", href: profile.github, Icon: GitHubIcon },
  ];

  return (
    <section id="contact" data-depth-section className="mx-auto max-w-6xl scroll-mt-20 px-6 py-10 sm:py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div data-reveal="left">
          <p className="font-mono text-sm tracking-widest text-accent uppercase">Contact</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s build something <span className="text-gradient">together.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Have a project, a role, or just want to connect? My inbox is always open and I&apos;ll get back to you
            as soon as I can.
          </p>
          <ul className="mt-10 space-y-3">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <TiltCard max={6} className="rounded-2xl">
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:border-accent/40 hover:bg-surface-hover"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="font-medium transition group-hover:text-accent">{value}</span>
                  </span>
                </a>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal="right">
          <TiltCard max={3} className="rounded-3xl">
            <ContactForm />
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
