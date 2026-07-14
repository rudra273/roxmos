import About from "@/components/About";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Work from "@/components/Work";

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

      {/* Work — dark, pinned client-work showcase.
          Its scroll track ends with one extra viewport of "hold" — Contact
          pulls itself up (-mt-[100vh]) and slides over the pinned stage.
          Keep Contact directly after Work. */}
      <Work />

      {/* Contact — dark, rises over Work */}
      <Contact />

      {/* Footer — dark */}
      <footer className="min-h-[40vh] bg-ink" />
    </main>
  );
}
