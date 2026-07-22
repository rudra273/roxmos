import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS, getProduct } from "@/lib/products";

/* ──────────────────────────────────────────────────────────
   Product detail route — /products/[slug]

   Server component: resolves the slug, sets per-product metadata,
   and prerenders one static page per product. The animated body
   lives in the ProductDetail client component. Navbar/Footer are
   mounted here since they're otherwise only in app/page.tsx.
   ────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found — ROXMOS" };
  return {
    title: `${product.name} — ROXMOS`,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </main>
  );
}
