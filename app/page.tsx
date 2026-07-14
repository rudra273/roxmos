import About from "@/components/About";
import Approach from "@/components/Approach";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <About />

      {/* Services — dark, Sui-style scroll reveal */}
      <Services />

      {/* Products — gradient, scroll-stacked glass deck */}
      <Products />

      {/* Approach — white */}
      <Approach />

      {/* Work — dark / grey */}
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
