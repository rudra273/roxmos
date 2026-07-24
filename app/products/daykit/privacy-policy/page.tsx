import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { DAYKIT_PRIVACY } from "@/lib/daykit-privacy";
import { getProduct } from "@/lib/products";

/* ──────────────────────────────────────────────────────────
   DayKit privacy policy — /products/daykit/privacy-policy

   Hosted public copy of the policy that ships inside the DayKit
   Android app, linked from the Google Play listing. Server
   component: sets metadata and mounts Navbar/Footer; the policy
   body renders via the reusable PrivacyPolicy client component.
   ────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "DayKit Privacy Policy — ROXMOS",
  description:
    "Privacy policy for the DayKit Android app: what data stays on your device, how encrypted backups and Google Drive work, and how optional permissions are used.",
  robots: { index: true, follow: true },
};

export default function DayKitPrivacyPolicyPage() {
  const daykit = getProduct("daykit");

  return (
    <main>
      <Navbar />
      <PrivacyPolicy
        content={DAYKIT_PRIVACY}
        productSlug="daykit"
        accent={daykit?.accent ?? "#fbbf24"}
      />
      <Footer />
    </main>
  );
}
