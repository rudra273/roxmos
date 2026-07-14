import Navbar from "@/components/Navbar";

/**
 * Home page — sections beyond Navbar are placeholders for now.
 * We are designing component by component:
 * Navbar ✓ → Hero → Our Services → Products → Services → Our Approach → Footer
 */
export default function Home() {
  return (
    <main>
      <Navbar />

      <section
        id="hero"
        className="flex min-h-screen items-center justify-center bg-ink"
      >
        <p className="font-display text-2xl opacity-30">Hero — coming next</p>
      </section>

      {/* Placeholder sections so nav anchors work.
          Each will be replaced by its real component. */}
      <section
        id="products"
        className="flex min-h-screen items-center justify-center bg-paper text-ink"
      >
        <p className="font-display text-2xl opacity-30">Products — coming next</p>
      </section>
      <section
        id="work"
        className="flex min-h-screen items-center justify-center bg-ink"
      >
        <p className="font-display text-2xl opacity-30">Work — coming next</p>
      </section>
      <section
        id="services"
        className="flex min-h-screen items-center justify-center bg-paper text-ink"
      >
        <p className="font-display text-2xl opacity-30">Services — coming next</p>
      </section>
      <section
        id="about"
        className="flex min-h-screen items-center justify-center bg-ink"
      >
        <p className="font-display text-2xl opacity-30">About — coming next</p>
      </section>
      <section
        id="approach"
        className="flex min-h-screen items-center justify-center bg-paper text-ink"
      >
        <p className="font-display text-2xl opacity-30">Our Approach — coming next</p>
      </section>
      <section
        id="blog"
        className="flex min-h-screen items-center justify-center bg-ink"
      >
        <p className="font-display text-2xl opacity-30">Blog — coming next</p>
      </section>
      <section
        id="contact"
        className="flex min-h-screen items-center justify-center bg-paper text-ink"
      >
        <p className="font-display text-2xl opacity-30">Contact — coming next</p>
      </section>
    </main>
  );
}
