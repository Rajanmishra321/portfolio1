import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { profile } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Chandigarh University" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Writing />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
