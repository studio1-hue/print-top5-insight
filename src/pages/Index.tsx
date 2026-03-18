import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Trophy,
  Crown,
} from "lucide-react";

import imgKalendarz from "@/assets/kalendarz.png";
import imgReflex from "@/assets/gra-reflex.png";
import imgMemory from "@/assets/memory.png";
import imgClipboard from "@/assets/clipboard.png";
import imgSegregator from "@/assets/segregator.png";

const products = [
  {
    id: "kalendarz",
    name: "Kalendarz trójdzielny LUX wypukły",
    badge: "Oferta od 1 maja",
    image: imgKalendarz,
    description: "Bestseller wśród produktów reklamowych. Elegancki kalendarz z wypukłym tłoczeniem, idealny jako upominek firmowy.",
    rank: 1,
  },
  {
    id: "gra-reflex",
    name: "Gra Re-Flex",
    badge: null,
    image: imgReflex,
    description: "Dynamiczna gra zręcznościowa z brandingiem klienta. Świetny gadżet angażujący odbiorców na eventach i w kampaniach.",
    rank: 2,
  },
  {
    id: "memory",
    name: "Memory w pudełku",
    badge: null,
    image: imgMemory,
    description: "Klasyczna gra memory w eleganckim, brandowanym pudełku. Idealna na prezenty i działania edukacyjne.",
    rank: 3,
  },
  {
    id: "clipboard",
    name: "Clipboardy A4",
    badge: null,
    image: imgClipboard,
    description: "Funkcjonalny clipboard w formacie A4 z pełnym brandingiem. Doskonały do codziennego użytku w biurze.",
    rank: 4,
  },
  {
    id: "segregator",
    name: "Segregatory A4",
    badge: null,
    image: imgSegregator,
    description: "Personalizowane segregatory A4 z nadrukiem. Trwałe i praktyczne — widoczność marki każdego dnia.",
    rank: 5,
  },
];

// Podium order: 2nd, 1st, 3rd
const podiumOrder = [1, 0, 2]; // indices into products array
const podiumHeights = ["h-44", "h-56", "h-36"]; // bar heights for 2nd, 1st, 3rd
const podiumColors = [
  "from-muted-foreground/20 to-muted-foreground/10", // silver
  "from-accent to-accent/60", // gold
  "from-primary/20 to-primary/10", // bronze
];

type Experience = "mam-dostawce" | "nie-kupuje";

interface ProductSelection {
  productId: string;
  experience: Experience;
  currentSupplier?: string;
}

const PodiumProduct = ({
  product,
  height,
  gradient,
  selected,
  onToggle,
  delay,
}: {
  product: typeof products[0];
  height: string;
  gradient: string;
  selected: boolean;
  onToggle: () => void;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex flex-col items-center"
  >
    {/* Product image floating above the podium */}
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
      className={`relative cursor-pointer mb-3 group`}
    >
      {product.rank === 1 && (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
        >
          <Crown className="h-8 w-8 text-accent fill-accent" />
        </motion.div>
      )}
      <div className={`relative rounded-2xl bg-card border-2 shadow-lg p-4 transition-all duration-300 ${
        selected
          ? "border-primary shadow-primary/20 shadow-xl ring-2 ring-primary/30"
          : "border-border group-hover:border-primary/40 group-hover:shadow-xl"
      }`}>
        <div className={`absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black shadow-md z-10 transition-all ${
          selected ? "bg-primary text-primary-foreground scale-110" : "bg-muted text-muted-foreground"
        }`}>
          {selected ? <CheckCircle2 className="h-5 w-5" /> : `#${product.rank}`}
        </div>
        <img
          src={product.image}
          alt={product.name}
          className={`object-contain transition-all duration-300 ${
            product.rank === 1 ? "h-32 w-32 md:h-40 md:w-40" : "h-24 w-24 md:h-32 md:w-32"
          }`}
        />
      </div>
      {product.badge && (
        <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold whitespace-nowrap shadow-md">
          {product.badge}
        </Badge>
      )}
    </motion.div>

    {/* Podium bar */}
    <div className={`w-full max-w-[160px] md:max-w-[200px] ${height} rounded-t-xl bg-gradient-to-t ${gradient} flex flex-col items-center justify-start pt-4 px-2 relative`}>
      <span className="text-xs md:text-sm font-bold text-foreground text-center leading-tight">
        {product.name}
      </span>
    </div>
  </motion.div>
);

const BottomProduct = ({
  product,
  selected,
  onToggle,
  delay,
}: {
  product: typeof products[0];
  selected: boolean;
  onToggle: () => void;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onToggle}
    className={`cursor-pointer rounded-2xl border-2 bg-card p-5 flex items-center gap-5 transition-all duration-300 ${
      selected
        ? "border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20"
        : "border-border hover:border-primary/30 hover:shadow-lg"
    }`}
  >
    <div className={`relative shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
      selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
    }`}>
      {selected ? <CheckCircle2 className="h-5 w-5" /> : `#${product.rank}`}
    </div>
    <div className="h-20 w-20 shrink-0 rounded-xl bg-muted/50 p-2 flex items-center justify-center">
      <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-foreground">{product.name}</p>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
    </div>
  </motion.div>
);

const ExperiencePanel = ({
  product,
  selection,
  onExperience,
  onSupplier,
}: {
  product: typeof products[0];
  selection: ProductSelection;
  onExperience: (exp: Experience) => void;
  onSupplier: (s: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="overflow-hidden"
  >
    <div className="mx-auto max-w-2xl rounded-2xl border-2 border-primary/20 bg-card p-5 shadow-lg mt-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-muted/50 p-1 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
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
        <div className="flex items-start gap-3 rounded-xl border border-border p-3 hover:bg-muted/50 transition-colors">
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
                  className="max-w-xs"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-border p-3 hover:bg-muted/50 transition-colors">
          <RadioGroupItem value="nie-kupuje" id={`${product.id}-b`} className="mt-0.5" />
          <Label htmlFor={`${product.id}-b`} className="cursor-pointer font-medium">
            Jeszcze nie kupuję, ale chętnie wdrożę
          </Label>
        </div>
      </RadioGroup>
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) {
      toast.error("Podaj imię i adres e-mail");
      return;
    }
    if (selectedProducts.length === 0) {
      toast.error("Wybierz przynajmniej jeden produkt");
      return;
    }
    toast.success(
      contactType === "handlowiec"
        ? "Dziękujemy! Handlowiec skontaktuje się z Tobą wkrótce."
        : "Dziękujemy! Link do spotkania video zostanie wysłany na Twój e-mail."
    );
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
              <Trophy className="mr-2 h-5 w-5" /> Zobacz podium TOP 5 <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Products - Podium */}
      <section id="products" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              <Trophy className="inline-block mr-3 h-8 w-8 text-accent" />
              Podium TOP 5
            </h2>
            <p className="mt-3 text-muted-foreground">
              Kliknij produkt, aby go wybrać i opisz swoje doświadczenie
            </p>
          </motion.div>
        </div>

        {/* Podium - Top 3 */}
        <div className="flex items-end justify-center gap-3 md:gap-6 mb-8">
          {podiumOrder.map((productIndex, i) => {
            const product = products[productIndex];
            return (
              <PodiumProduct
                key={product.id}
                product={product}
                height={podiumHeights[i]}
                gradient={podiumColors[i]}
                selected={!!selections[product.id]}
                onToggle={() => toggleProduct(product.id)}
                delay={i === 1 ? 0 : i === 0 ? 0.2 : 0.4}
              />
            );
          })}
        </div>

        {/* Experience panels for top 3 */}
        <AnimatePresence>
          {podiumOrder.map((productIndex) => {
            const product = products[productIndex];
            if (!selections[product.id]) return null;
            return (
              <ExperiencePanel
                key={product.id}
                product={product}
                selection={selections[product.id]}
                onExperience={(exp) => setExperience(product.id, exp)}
                onSupplier={(s) => setSupplier(product.id, s)}
              />
            );
          })}
        </AnimatePresence>

        {/* Bottom 2 - positions 4 & 5 */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
          {[products[3], products[4]].map((product, i) => (
            <BottomProduct
              key={product.id}
              product={product}
              selected={!!selections[product.id]}
              onToggle={() => toggleProduct(product.id)}
              delay={0.1 * i}
            />
          ))}
        </div>

        {/* Experience panels for bottom 2 */}
        <AnimatePresence>
          {[products[3], products[4]].map((product) => {
            if (!selections[product.id]) return null;
            return (
              <ExperiencePanel
                key={product.id}
                product={product}
                selection={selections[product.id]}
                onExperience={(exp) => setExperience(product.id, exp)}
                onSupplier={(s) => setSupplier(product.id, s)}
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
              Wybrane produkty: {selectedProducts.map((id) => products.find((p) => p.id === id)?.name).join(", ")}
            </DialogDescription>
          </DialogHeader>

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
