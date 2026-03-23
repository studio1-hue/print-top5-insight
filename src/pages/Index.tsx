import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  CheckCircle2,
  Mail,
  Phone,
  User,
  Video,
  Gift,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Sparkles,
  Send,
} from "lucide-react";

import imgKalendarz from "@/assets/kalendarz.webp";
import imgReflex from "@/assets/gra-reflex.webp";
import imgMemory from "@/assets/memory.webp";
import imgClipboard from "@/assets/clipboard.webp";
import imgSegregator from "@/assets/segregator.webp";

const products = [
  {
    id: "kalendarz",
    name: "Kalendarz trójdzielny LUX wypukły",
    badge: "Oferta od 1 maja",
    image: imgKalendarz,
    description: "Bestseller wśród produktów reklamowych. Elegancki kalendarz z wypukłym tłoczeniem, idealny jako upominek firmowy.",
    rank: 1,
    color: "from-amber-500/20 to-orange-500/10",
    glow: "shadow-amber-500/20",
  },
  {
    id: "gra-reflex",
    name: "Gra Re-Flex",
    badge: null,
    image: imgReflex,
    description: "Dynamiczna gra zręcznościowa z brandingiem klienta. Świetny gadżet angażujący odbiorców na eventach i w kampaniach.",
    rank: 2,
    color: "from-violet-500/20 to-purple-500/10",
    glow: "shadow-violet-500/20",
  },
  {
    id: "memory",
    name: "Memory w pudełku",
    badge: null,
    image: imgMemory,
    description: "Klasyczna gra memory w eleganckim, brandowanym pudełku. Idealna na prezenty i działania edukacyjne.",
    rank: 3,
    color: "from-rose-500/20 to-pink-500/10",
    glow: "shadow-rose-500/20",
  },
  {
    id: "clipboard",
    name: "Clipboardy A4",
    badge: null,
    image: imgClipboard,
    description: "Funkcjonalny clipboard w formacie A4 z pełnym brandingiem. Doskonały do codziennego użytku w biurze.",
    rank: 4,
    color: "from-emerald-500/20 to-green-500/10",
    glow: "shadow-emerald-500/20",
  },
  {
    id: "segregator",
    name: "Segregatory A4",
    badge: null,
    image: imgSegregator,
    description: "Personalizowane segregatory A4 z nadrukiem. Trwałe i praktyczne — widoczność marki każdego dnia.",
    rank: 5,
    color: "from-sky-500/20 to-blue-500/10",
    glow: "shadow-sky-500/20",
  },
];

// Fan angles for 5 cards
const fanAngles = [-12, -6, 0, 6, 12];
const fanOffsetY = [20, 8, 0, 8, 20];

type Experience = "mam-dostawce" | "nie-kupuje";

interface ProductSelection {
  productId: string;
  experience: Experience;
  currentSupplier?: string;
}

function TiltCard({
  product,
  selected,
  onToggle,
  fanAngle,
  offsetY,
  index,
}: {
  product: (typeof products)[0];
  selected: boolean;
  onToggle: () => void;
  fanAngle: number;
  offsetY: number;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: 0 }}
      whileInView={{ opacity: 1, y: offsetY, rotate: fanAngle }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring", bounce: 0.3 }}
      whileHover={{ y: offsetY - 30, rotate: 0, scale: 1.08, zIndex: 50 }}
      className="relative"
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        onClick={onToggle}
        style={{ rotateX: springRotateX, rotateY: springRotateY }}
        className={`
          relative cursor-pointer w-[220px] md:w-[240px] rounded-3xl border-2 bg-card
          p-5 transition-shadow duration-300 select-none
          ${selected
            ? `border-primary shadow-2xl ${product.glow} ring-2 ring-primary/30`
            : `border-border/60 shadow-xl hover:shadow-2xl ${product.glow}`
          }
        `}
      >
        {/* Gradient background */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${product.color} opacity-60`} />

        {/* Rank badge */}
        <div className={`absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black shadow-lg z-10 transition-all ${
          selected ? "bg-primary text-primary-foreground scale-110" : "bg-card text-foreground border border-border"
        }`}>
          {selected ? <CheckCircle2 className="h-5 w-5" /> : `#${product.rank}`}
        </div>

        {/* Product badge */}
        {product.badge && (
          <Badge className="absolute -top-2 right-3 bg-accent text-accent-foreground text-[10px] font-bold shadow-md z-10">
            {product.badge}
          </Badge>
        )}

        {/* Image */}
        <div className="relative z-[1] flex justify-center pt-2 pb-4">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-32 w-32 md:h-36 md:w-36 object-contain drop-shadow-lg mix-blend-multiply"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </div>

        {/* Text */}
        <div className="relative z-[1]">
          <p className="font-bold text-foreground text-sm leading-tight text-center">{product.name}</p>
          <p className="text-xs text-muted-foreground mt-2 text-center line-clamp-2">{product.description}</p>
        </div>

        {/* Selection indicator */}
        <div className={`relative z-[1] mt-4 flex justify-center`}>
          <div className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}>
            {selected ? "✓ Wybrano" : "Kliknij aby wybrać"}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const ExperiencePanel = ({
  product,
  selection,
  onExperience,
  onSupplier,
  onContact,
}: {
  product: (typeof products)[0];
  selection: ProductSelection;
  onExperience: (exp: Experience) => void;
  onSupplier: (s: string) => void;
  onContact: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="overflow-hidden"
  >
    <div className={`mx-auto max-w-lg rounded-2xl border-2 border-primary/20 bg-card p-5 shadow-lg mt-4 bg-gradient-to-br ${product.color}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-xl bg-card/80 p-1.5 flex items-center justify-center shadow-sm">
          <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply" />
        </div>
        <div>
          <p className="font-bold text-foreground">{product.name}</p>
          <p className="text-xs text-muted-foreground">Jakie masz doświadczenie z tym produktem?</p>
        </div>
      </div>
      <RadioGroup
        value={selection.experience}
        onValueChange={(val) => onExperience(val as Experience)}
        className="space-y-3"
      >
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card/80 p-3 hover:bg-card transition-colors">
          <RadioGroupItem value="mam-dostawce" id={`${product.id}-a`} className="mt-0.5" />
          <div>
            <Label htmlFor={`${product.id}-a`} className="cursor-pointer font-medium">
              Mam już dostawcę — chętnie porównam
            </Label>
            {selection.experience === "mam-dostawce" && (
              <div className="mt-2">
                <Input
                  placeholder="Obecny dostawca (nieobowiązkowo)"
                  value={selection.currentSupplier || ""}
                  onChange={(e) => onSupplier(e.target.value)}
                  className="max-w-xs bg-card"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card/80 p-3 hover:bg-card transition-colors">
          <RadioGroupItem value="nie-kupuje" id={`${product.id}-b`} className="mt-0.5" />
          <Label htmlFor={`${product.id}-b`} className="cursor-pointer font-medium">
            Jeszcze nie kupuję, ale chętnie wdrożę
          </Label>
        </div>
      </RadioGroup>

      {/* Contact button after selection */}
      {selection.experience && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex justify-center"
        >
          <Button onClick={onContact} className="gap-2">
            <Send className="h-4 w-4" />
            Skontaktuj się z nami
          </Button>
        </motion.div>
      )}
    </div>
  </motion.div>
);

const Index = () => {
  const [selections, setSelections] = useState<Record<string, ProductSelection>>({});
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [couponEmail, setCouponEmail] = useState("");
  const [couponRevealed, setCouponRevealed] = useState(false);
  const [contactType, setContactType] = useState<"handlowiec" | "video">("handlowiec");

  const selectedProducts = Object.keys(selections);

  const toggleProduct = (id: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = { productId: id, experience: "nie-kupuje" };
      }
      return next;
    });
  };

  const setExperience = (productId: string, exp: Experience) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], productId, experience: exp },
    }));
  };

  const setSupplier = (productId: string, supplier: string) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], currentSupplier: supplier },
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) {
      toast.error("Podaj imię i adres e-mail");
      return;
    }
    if (selectedProducts.length === 0) {
      toast.error("Wybierz przynajmniej jeden produkt");
      return;
    }

    const productSummary = selectedProducts
      .map((id) => {
        const product = products.find((p) => p.id === id);
        const sel = selections[id];
        if (!product || !sel) return "";
        const exp =
          sel.experience === "mam-dostawce"
            ? `Mam dostawcę${sel.currentSupplier ? ` (${sel.currentSupplier})` : ""}`
            : "Jeszcze nie kupuję — chcę wdrożyć";
        return `• ${product.name}: ${exp}`;
      })
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("https://formspree.io/f/xnjgklzn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone || "—",
          message: contactForm.message || "—",
          products: productSummary,
          contactType: contactType === "handlowiec" ? "Kontakt z handlowcem" : "Video spotkanie",
        }),
      });

      if (!response.ok) throw new Error("Formspree error");

      toast.success(
        contactType === "handlowiec"
          ? "Dziękujemy! Handlowiec skontaktuje się z Tobą wkrótce."
          : "Dziękujemy! Link do spotkania video zostanie wysłany na Twój e-mail."
      );
    } catch (err) {
      console.error("Failed to send lead notification:", err);
      toast.error("Nie udało się wysłać zgłoszenia. Spróbuj ponownie.");
    }

    setContactOpen(false);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const handleCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponEmail || !couponEmail.includes("@")) {
      toast.error("Podaj poprawny adres e-mail");
      return;
    }
    setCouponRevealed(true);
    toast.success("Kupon został wygenerowany!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">PrintPartner</span>
          </div>
          <Button
            onClick={() => {
              if (selectedProducts.length === 0) {
                toast.error("Najpierw wybierz produkt z listy poniżej");
                return;
              }
              setContactOpen(true);
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Skontaktuj się
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-accent text-accent-foreground px-4 py-1.5 text-sm font-semibold">
              <TrendingUp className="mr-1.5 h-4 w-4" /> Dane z rynku drukarni reklamowych
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Te <span className="text-primary">5 produktów</span> generuje{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">60%</span> sprzedaży w drukarni
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Sprawdź, które produkty najlepiej się sprzedają i wprowadź je do swojej oferty. Wybierz interesujące Cię produkty, a my pomożemy Ci je wdrożyć.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Sparkles className="mr-2 h-5 w-5" /> Odkryj TOP 5 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-border px-4 py-10">
          {[
            { value: "60%", label: "sprzedaży z TOP 5" },
            { value: "5", label: "sprawdzonych produktów" },
            { value: "100+", label: "zadowolonych agencji" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="px-4 text-center"
            >
              <div className="text-3xl font-extrabold text-primary md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products - 3D Cards Fan */}
      <section id="products" className="py-20 overflow-hidden">
        <div className="mb-16 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Odkryj TOP 5 produktów
            </h2>
            <p className="mt-3 text-muted-foreground">
              Najedź na kartę, aby ją obejrzeć • Kliknij, aby wybrać
            </p>
          </motion.div>
        </div>

        {/* Fan of cards */}
        <div className="flex items-center justify-center gap-[-20px] pb-16 pt-8 px-4">
          <div className="flex items-end justify-center" style={{ gap: "-10px" }}>
            {products.map((product, i) => (
              <TiltCard
                key={product.id}
                product={product}
                selected={!!selections[product.id]}
                onToggle={() => toggleProduct(product.id)}
                fanAngle={fanAngles[i]}
                offsetY={fanOffsetY[i]}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Experience panels */}
        <div className="max-w-6xl mx-auto px-4">
          <AnimatePresence>
            {products.map((product) => {
              if (!selections[product.id]) return null;
              return (
                <ExperiencePanel
                  key={product.id}
                  product={product}
                  selection={selections[product.id]}
                  onExperience={(exp) => setExperience(product.id, exp)}
                  onSupplier={(s) => setSupplier(product.id, s)}
                  onContact={() => setContactOpen(true)}
                />
              );
            })}
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              onClick={() => {
                if (selectedProducts.length === 0) {
                  toast.error("Wybierz przynajmniej jeden produkt");
                  return;
                }
                setContactType("handlowiec");
                setContactOpen(true);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto shadow-lg shadow-primary/20"
            >
              <Phone className="mr-2 h-4 w-4" /> Poproś o kontakt handlowca
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                if (selectedProducts.length === 0) {
                  toast.error("Wybierz przynajmniej jeden produkt");
                  return;
                }
                setContactType("video");
                setContactOpen(true);
              }}
              className="w-full sm:w-auto"
            >
              <Video className="mr-2 h-4 w-4" /> Umów video spotkanie
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Coupon */}
      <section className="border-t border-border bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
              <Gift className="h-7 w-7 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Kupon rabatowy na pierwsze zamówienie</h2>
            <p className="mt-2 text-muted-foreground">
              Podaj swój adres e-mail, a kupon pojawi się natychmiast.
            </p>

            {!couponRevealed ? (
              <form onSubmit={handleCoupon} className="mx-auto mt-6 flex max-w-sm gap-2">
                <Input
                  type="email"
                  placeholder="Twój adres e-mail"
                  value={couponEmail}
                  onChange={(e) => setCouponEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Mail className="mr-2 h-4 w-4" /> Pobierz
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="mt-6"
              >
                <div className="inline-block rounded-2xl border-2 border-dashed border-primary bg-card px-8 py-6 shadow-lg">
                  <p className="text-sm text-muted-foreground mb-1">Twój kod rabatowy:</p>
                  <p className="text-4xl font-black tracking-widest text-primary">FIRST10</p>
                  <p className="mt-2 text-sm text-muted-foreground">10% zniżki na pierwsze zamówienie</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PrintPartner. Wszystkie prawa zastrzeżone.
        </div>
      </footer>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {contactType === "handlowiec" ? "Kontakt z handlowcem" : "Umów video spotkanie"}
            </DialogTitle>
            <DialogDescription>
              Wybrane produkty i preferencje:
            </DialogDescription>
          </DialogHeader>

          {/* Summary of selections */}
          <div className="space-y-2 rounded-xl border border-border bg-muted/50 p-4 text-sm">
            {selectedProducts.map((id) => {
              const product = products.find((p) => p.id === id);
              const sel = selections[id];
              if (!product || !sel) return null;
              return (
                <div key={id} className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground">{product.name}</span>
                  <span className="text-muted-foreground">
                    {sel.experience === "mam-dostawce"
                      ? `Mam dostawcę${sel.currentSupplier ? ` — ${sel.currentSupplier}` : ""}`
                      : "Jeszcze nie kupuję — chcę wdrożyć"}
                  </span>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Imię i nazwisko *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Jan Kowalski"
                  value={contactForm.name}
                  onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="jan@agencja.pl"
                  value={contactForm.email}
                  onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="+48 123 456 789"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm((f) => ({ ...f, phone: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Wiadomość (opcjonalnie)</Label>
              <Textarea
                id="message"
                placeholder="Dodatkowe pytania..."
                value={contactForm.message}
                onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                {contactType === "handlowiec" ? (
                  <>
                    <Phone className="mr-2 h-4 w-4" /> Wyślij zgłoszenie
                  </>
                ) : (
                  <>
                    <Video className="mr-2 h-4 w-4" /> Wyślij i umów spotkanie
                  </>
                )}
              </Button>
              {contactType === "video" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open("https://calendly.com", "_blank")}
                  className="flex-1"
                >
                  <Video className="mr-2 h-4 w-4" /> Otwórz Calendly
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
