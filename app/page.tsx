import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <About />

      {/* Services — dark, Sui-style scroll reveal */}
      <Services />

      {/* Products — dark */}
      <section id="products" className="min-h-screen bg-ink" />

      {/* Approach — white */}
      <section id="approach" className="min-h-screen bg-paper" />

      {/* Work — white / grey */}
      <section id="work">
        <div className="h-[50vh] bg-paper" />
        <div className="h-[50vh] bg-[#e8ebf1]" />
      </section>

      {/* Contact — dark */}
      <section id="contact" className="min-h-screen bg-ink" />

      {/* Footer — dark */}
      <footer className="min-h-[40vh] bg-ink" />
    </main>
  );
}
