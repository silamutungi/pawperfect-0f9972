import { useState } from "react";
import { Star, ShieldCheck, Clock, Camera, Search, ChevronRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
import { formatCurrency } from "../lib/utils";
import type { Groomer } from "../types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

const SEED_GROOMERS: Groomer[] = [
  { id: "1", name: "Maya Chen", location: "Brooklyn, NY", rating: 4.9, review_count: 218, specialties: ["Doodles", "Poodles", "Bichons"], price_from: 65, badge: "Top Groomer", bio: "Certified master groomer with 11 years working exclusively with curly-coat breeds.", years_exp: 11, verified: true, breeds_served: ["Goldendoodle", "Labradoodle", "Poodle", "Bichon Frise"], next_available: "Today 2:00 PM" },
  { id: "2", name: "James Rivera", location: "Astoria, NY", rating: 4.8, review_count: 143, specialties: ["Large Breeds", "Double Coats"], price_from: 75, badge: "Breed Expert", bio: "Former vet tech turned groomer. Specializes in deshedding and large-breed handling.", years_exp: 8, verified: true, breeds_served: ["Husky", "Golden Retriever", "German Shepherd", "Malamute"], next_available: "Tomorrow 10:00 AM" },
  { id: "3", name: "Sofia Okafor", location: "Park Slope, NY", rating: 5.0, review_count: 87, specialties: ["Anxious Dogs", "Puppies"], price_from: 70, badge: "Anxiety Specialist", bio: "Fear-Free certified groomer. Every appointment includes a behavioral briefing review.", years_exp: 6, verified: true, breeds_served: ["All breeds"], next_available: "Today 4:30 PM" },
  { id: "4", name: "Tom Nakamura", location: "Williamsburg, NY", rating: 4.7, review_count: 194, specialties: ["Terriers", "Schnauzers", "Wire Coats"], price_from: 60, badge: "Wire Coat Pro", bio: "Hand-stripping specialist. 9 years perfecting technique for terrier and schnauzer coat types.", years_exp: 9, verified: true, breeds_served: ["Schnauzer", "Airedale", "Wire Fox Terrier", "Westie"], next_available: "Wed 11:00 AM" },
  { id: "5", name: "Priya Mehta", location: "Hoboken, NJ", rating: 4.8, review_count: 162, specialties: ["Show Cuts", "Asian Fusion"], price_from: 80, badge: "Show Expert", bio: "Competitive grooming champion. Offers show-quality cuts and creative styling.", years_exp: 12, verified: true, breeds_served: ["Shih Tzu", "Maltese", "Pomeranian", "Toy Poodle"], next_available: "Thu 1:00 PM" },
  { id: "6", name: "Chris Walsh", location: "Jersey City, NJ", rating: 4.6, review_count: 109, specialties: ["Senior Dogs", "Medical Needs"], price_from: 65, badge: "Senior Care", bio: "Trained in geriatric dog care. Gentle handling for dogs with arthritis or mobility issues.", years_exp: 7, verified: true, breeds_served: ["All breeds"], next_available: "Fri 9:00 AM" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const groomers = SEED_GROOMERS.filter(
    (g) =>
      search === "" ||
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase()) ||
      g.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <Navbar />

      {!isSupabaseConfigured && (
        <div className="text-center py-2 px-4 text-sm font-medium" style={{ background: "var(--color-accent)", color: "#fff" }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}

      <section
        style={{
          backgroundImage: "url(https://images.pexels.com/photos/19145880/pexels-photo-19145880.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
        aria-label="Hero section"
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 100%)" }} aria-hidden="true" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold mb-6" style={{ background: "rgba(200,75,17,0.85)", color: "#fff" }}>
              <BadgeCheck size={14} aria-hidden="true" /> 500+ verified groomers near you
            </span>
            <h1 className="font-bold mb-6" style={{ fontSize: "var(--text-large-title)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)", color: "#fff" }}>
              Book a breed-savvy groomer with instant confirmation.
            </h1>
            <p className="mb-8" style={{ fontSize: "var(--text-headline)", lineHeight: "var(--leading-relaxed)", color: "rgba(255,255,255,0.88)" }}>
              Every groomer is background-checked, credentials-verified, and matched to your dog&apos;s breed. No no-shows. No surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/signup">
                <Button size="lg" style={{ background: "var(--color-primary)", color: "#fff", minHeight: "52px" }}>
                  Find a Groomer <ChevronRight size={16} aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/signup?role=groomer">
                <Button size="lg" variant="outline" style={{ borderColor: "rgba(255,255,255,0.6)", color: "#fff", minHeight: "52px" }}>
                  List for Free
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-10">
              {[{ icon: ShieldCheck, label: "Verified credentials" }, { icon: Clock, label: "Instant confirmation" }, { icon: Camera, label: "Photo proof after every appointment" }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.88)" }}>
                  <Icon size={16} aria-hidden="true" />
                  <span style={{ fontSize: "var(--text-subhead)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: "var(--color-bg)" }} aria-labelledby="groomers-heading">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 id="groomers-heading" className="font-bold mb-2" style={{ fontSize: "var(--text-title-1)" }}>
                Browse groomers near you
              </h2>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-subhead)" }}>
                Every groomer is vetted, insured, and rated by real dog owners.
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
              <input
                type="search"
                placeholder="Breed, location, or specialty"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search groomers"
                className="w-full rounded-lg pl-9 pr-4 py-2.5 border text-sm focus:outline-none"
                style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)", color: "var(--color-text)", minHeight: "44px" }}
              />
            </div>
          </div>

          {groomers.length === 0 ? (
            <div className="text-center py-20" role="status">
              <p className="font-semibold mb-2" style={{ fontSize: "var(--text-headline)" }}>No groomers found for &ldquo;{search}&rdquo;</p>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-subhead)" }}>Try a broader search or browse all groomers.</p>
              <button onClick={() => setSearch("")} className="mt-4 underline" style={{ color: "var(--color-primary)", fontSize: "var(--text-subhead)" }}>Clear search</button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {groomers.map((g) => (
                <Card key={g.id} className="border overflow-hidden transition-shadow hover:shadow-sm" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: "var(--color-primary)", color: "#fff" }}>
                        {g.name.charAt(0)}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {g.verified && (
                          <Badge variant="outline" className="text-xs flex items-center gap-1" style={{ borderColor: "var(--color-success)", color: "var(--color-success)" }}>
                            <ShieldCheck size={10} aria-hidden="true" /> Verified
                          </Badge>
                        )}
                        <Badge className="text-xs" style={{ background: "rgba(200,75,17,0.1)", color: "var(--color-primary)" }}>{g.badge}</Badge>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-0.5" style={{ fontSize: "var(--text-headline)" }}>{g.name}</h3>
                    <p className="mb-2" style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-secondary)" }}>{g.location} &bull; {g.years_exp} yrs exp</p>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Star size={14} fill="currentColor" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                      <span className="font-semibold" style={{ fontSize: "var(--text-subhead)" }}>{g.rating}</span>
                      <span style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-muted)" }}>({g.review_count} reviews)</span>
                    </div>
                    <p className="mb-3" style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>{g.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {g.specialties.map((s) => (
                        <span key={s} className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: "var(--color-bg-muted)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}>{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold" style={{ color: "var(--color-primary)", fontSize: "var(--text-headline)" }}>{formatCurrency(g.price_from)}</span>
                        <span style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-muted)" }}> / session</span>
                      </div>
                      <div className="flex items-center gap-1" style={{ fontSize: "var(--text-footnote)", color: "var(--color-success)" }}>
                        <Clock size={12} aria-hidden="true" />
                        <span>{g.next_available}</span>
                      </div>
                    </div>
                    <Link to="/signup">
                      <Button className="w-full mt-3" style={{ background: "var(--color-primary)", color: "#fff", minHeight: "44px" }}>
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: "var(--color-bg-surface)" }} aria-labelledby="why-heading">
        <div className="max-w-5xl mx-auto px-6">
          <h2 id="why-heading" className="font-bold mb-4" style={{ fontSize: "var(--text-title-1)" }}>Why groomers and owners choose PawPerfect</h2>
          <p className="mb-14" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-subhead)", maxWidth: "560px" }}>Built for both sides of the marketplace. Owners find the right fit. Groomers get booked by clients who are prepared and serious.</p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { emoji: "🔍", title: "Breed-matched booking", desc: "We surface groomers with documented experience in your dog's specific breed — not just anyone available." },
              { emoji: "✅", title: "Instant confirmation", desc: "No pending requests. When you book, it's confirmed. Real-time availability prevents double-bookings." },
              { emoji: "📸", title: "Photo proof every time", desc: "Groomers submit before-and-after photos at appointment close, creating an accountability record for every visit." },
              { emoji: "🛡️", title: "Verified credentials", desc: "Every groomer submits certifications, insurance proof, and passes a background check before listing." },
              { emoji: "📋", title: "Pet profile intelligence", desc: "Your dog's breed, coat, age, and behavioral notes travel with every booking — groomers arrive prepared." },
              { emoji: "💰", title: "List for free", desc: "Groomers join at no cost. Set your availability, showcase your specialties, and get booked by owners who match your expertise." },
            ].map(({ emoji, title, desc }) => (
              <div key={title}>
                <div className="text-4xl mb-4" aria-hidden="true">{emoji}</div>
                <h3 className="font-semibold mb-2" style={{ fontSize: "var(--text-title-3)" }}>{title}</h3>
                <p style={{ fontSize: "var(--text-subhead)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: "var(--color-bg)" }} aria-labelledby="cta-heading">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 id="cta-heading" className="font-bold mb-4" style={{ fontSize: "var(--text-title-1)" }}>Ready to find the perfect groomer?</h2>
          <p className="mb-8 mx-auto" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-subhead)", maxWidth: "480px" }}>Join thousands of dog owners who book with confidence. Secure payments, buyer protection on every appointment.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup">
              <Button size="lg" style={{ background: "var(--color-primary)", color: "#fff", minHeight: "52px" }}>Start Browsing</Button>
            </Link>
            <Link to="/signup?role=groomer">
              <Button size="lg" variant="outline" style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)", minHeight: "52px" }}>Join as a Groomer</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
