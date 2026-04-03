import { useState } from "react";
import { CalendarDays, PawPrint, Star, Camera, Clock, CheckCircle2, XCircle, AlertCircle, Plus } from "lucide-react";
import { isSupabaseConfigured } from "../lib/supabase";
import { formatCurrency, formatDate, formatTime } from "../lib/utils";
import type { Appointment, Pet } from "../types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

const SEED_APPOINTMENTS: Appointment[] = [
  { id: "1", groomer_name: "Maya Chen", service: "Full Groom + Deshed", pet_name: "Biscuit", date: "2025-08-12", time: "14:00", status: "upcoming", price: 85 },
  { id: "2", groomer_name: "Sofia Okafor", service: "Bath & Brush", pet_name: "Luna", date: "2025-07-28", time: "10:30", status: "completed", price: 70, photo_proof: "available" },
  { id: "3", groomer_name: "James Rivera", service: "Nail Trim + Ear Clean", pet_name: "Biscuit", date: "2025-07-10", time: "09:00", status: "completed", price: 35, photo_proof: "available" },
  { id: "4", groomer_name: "Tom Nakamura", service: "Full Groom", pet_name: "Luna", date: "2025-06-22", time: "11:00", status: "cancelled", price: 75 },
];

const SEED_PETS: Pet[] = [
  { id: "1", name: "Biscuit", breed: "Goldendoodle", age: 3, coat_type: "Curly", special_notes: "Trim around eyes — sensitive. Likes the blow dryer on low.", behavioral_notes: "Anxious with strangers initially. Warms up after 5 min. No aggression." },
  { id: "2", name: "Luna", breed: "Siberian Husky", age: 5, coat_type: "Double coat", special_notes: "Full deshed every 8 weeks. No shaving — double coat.", behavioral_notes: "Very energetic. Needs 10 min walk before appointment. Leash-reactive outside." },
];

const STATUS_CONFIG = {
  upcoming: { label: "Upcoming", icon: Clock, color: "var(--color-info)" },
  completed: { label: "Completed", icon: CheckCircle2, color: "var(--color-success)" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "var(--color-error)" },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"appointments" | "pets">("appointments");
  const appointments = SEED_APPOINTMENTS;
  const pets = SEED_PETS;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <Navbar />
      {!isSupabaseConfigured && (
        <div className="text-center py-2 px-4 text-sm font-medium" style={{ background: "var(--color-accent)", color: "#fff" }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-bold" style={{ fontSize: "var(--text-title-1)" }}>My Dashboard</h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-subhead)" }}>Manage your appointments and pet profiles.</p>
          </div>
          <Button style={{ background: "var(--color-primary)", color: "#fff", minHeight: "44px" }}>
            <Plus size={16} aria-hidden="true" /> Book a Groomer
          </Button>
        </div>

        <div className="flex gap-1 mb-8 border-b" style={{ borderColor: "var(--color-border)" }} role="tablist">
          {(["appointments", "pets"] as const).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2.5 font-semibold capitalize transition-colors"
              style={{
                fontSize: "var(--text-subhead)",
                borderBottom: activeTab === tab ? "2px solid var(--color-primary)" : "2px solid transparent",
                color: activeTab === tab ? "var(--color-primary)" : "var(--color-text-secondary)",
                minHeight: "44px",
              }}
            >
              {tab === "appointments" ? <><CalendarDays size={14} className="inline mr-1.5" aria-hidden="true" />Appointments</> : <><PawPrint size={14} className="inline mr-1.5" aria-hidden="true" />My Pets</>}
            </button>
          ))}
        </div>

        {activeTab === "appointments" && (
          <section aria-label="Your appointments">
            {appointments.length === 0 ? (
              <div className="text-center py-20" role="status">
                <CalendarDays size={32} className="mx-auto mb-3" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
                <p className="font-semibold mb-1" style={{ fontSize: "var(--text-headline)" }}>No appointments yet</p>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-subhead)" }}>Browse groomers and book your first appointment.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {appointments.map((appt) => {
                  const cfg = STATUS_CONFIG[appt.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <Card key={appt.id} className="border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: "var(--color-primary)", color: "#fff" }}>
                              {appt.groomer_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold" style={{ fontSize: "var(--text-headline)" }}>{appt.service}</p>
                              <p style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-secondary)" }}>{appt.groomer_name} &bull; {appt.pet_name}</p>
                              <p style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-secondary)" }}>{formatDate(appt.date)} at {formatTime(appt.time)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-wrap">
                            {appt.photo_proof && (
                              <div className="flex items-center gap-1" style={{ fontSize: "var(--text-footnote)", color: "var(--color-success)" }}>
                                <Camera size={12} aria-hidden="true" />
                                <span>Photo proof</span>
                              </div>
                            )}
                            <Badge variant="outline" className="flex items-center gap-1" style={{ borderColor: cfg.color, color: cfg.color }}>
                              <StatusIcon size={11} aria-hidden="true" />{cfg.label}
                            </Badge>
                            <span className="font-bold" style={{ color: "var(--color-primary)", fontSize: "var(--text-headline)" }}>{formatCurrency(appt.price)}</span>
                          </div>
                        </div>
                        {appt.status === "upcoming" && (
                          <div className="mt-4 pt-4 flex gap-2" style={{ borderTop: "1px solid var(--color-border)" }}>
                            <Button size="sm" variant="outline" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", minHeight: "36px" }}>Reschedule</Button>
                            <Button size="sm" variant="outline" style={{ borderColor: "rgba(220,38,38,0.3)", color: "var(--color-error)", minHeight: "36px" }}>Cancel</Button>
                          </div>
                        )}
                        {appt.status === "completed" && (
                          <div className="mt-4 pt-4 flex gap-2" style={{ borderTop: "1px solid var(--color-border)" }}>
                            <Button size="sm" style={{ background: "var(--color-primary)", color: "#fff", minHeight: "36px" }}><Star size={12} aria-hidden="true" /> Leave Review</Button>
                            <Button size="sm" variant="outline" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", minHeight: "36px" }}><AlertCircle size={12} aria-hidden="true" /> Report Issue</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {activeTab === "pets" && (
          <section aria-label="Your pet profiles">
            {pets.length === 0 ? (
              <div className="text-center py-20" role="status">
                <PawPrint size={32} className="mx-auto mb-3" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
                <p className="font-semibold mb-1" style={{ fontSize: "var(--text-headline)" }}>No pet profiles yet</p>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-subhead)" }}>Add your dog&apos;s profile so groomers arrive prepared.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {pets.map((pet) => (
                  <Card key={pet.id} className="border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: "rgba(200,75,17,0.1)" }} aria-hidden="true">🐾</div>
                        <div>
                          <h3 className="font-bold" style={{ fontSize: "var(--text-title-3)" }}>{pet.name}</h3>
                          <p style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-secondary)" }}>{pet.breed} &bull; {pet.age} yrs &bull; {pet.coat_type} coat</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="rounded-lg p-3" style={{ background: "var(--color-bg-muted)", border: "1px solid var(--color-border)" }}>
                          <p className="font-semibold mb-0.5" style={{ fontSize: "var(--text-caption)", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "var(--tracking-overline)" }}>Grooming notes</p>
                          <p style={{ fontSize: "var(--text-footnote)", lineHeight: "var(--leading-relaxed)" }}>{pet.special_notes}</p>
                        </div>
                        <div className="rounded-lg p-3" style={{ background: "var(--color-bg-muted)", border: "1px solid var(--color-border)" }}>
                          <p className="font-semibold mb-0.5" style={{ fontSize: "var(--text-caption)", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "var(--tracking-overline)" }}>Behavioral notes</p>
                          <p style={{ fontSize: "var(--text-footnote)", lineHeight: "var(--leading-relaxed)" }}>{pet.behavioral_notes}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="mt-4" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", minHeight: "36px" }}>Edit Profile</Button>
                    </CardContent>
                  </Card>
                ))}
                <button
                  className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 p-8 transition-colors hover:border-primary"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", minHeight: "180px" }}
                >
                  <Plus size={24} aria-hidden="true" />
                  <span className="font-medium" style={{ fontSize: "var(--text-subhead)" }}>Add a pet</span>
                  <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-muted)" }}>Add your dog&apos;s profile in under 2 minutes.</span>
                </button>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
