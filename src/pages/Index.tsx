import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Calendar,
  Gamepad2,
  Puzzle,
  ClipboardList,
  BookOpen,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Video,
  Gift,
  ArrowRight,
  Star,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const products = [
  {
    id: "kalendarz",
    name: "Kalendarz trójdzielny LUX wypukły",
    badge: "Oferta od 1 maja",
    icon: Calendar,
    description: "Bestseller wśród produktów reklamowych. Elegancki kalendarz z wypukłym tłoczeniem, idealny jako upominek firmowy.",
    rank: 1,
    share: "18%",
  },
  {
    id: "gra-reflex",
    name: "Gra Re-Flex",
    badge: null,
    icon: Gamepad2,
    description: "Dynamiczna gra zręcznościowa z brandingiem klienta. Świetny gadżet angażujący odbiorców na eventach i w kampaniach.",
    rank: 2,
    share: "14%",
  },
  {
    id: "memory",
    name: "Memory w pudełku",
    badge: null,
    icon: Puzzle,
    description: "Klasyczna gra memory w eleganckim, brandowanym pudełku. Idealna na prezenty i działania edukacyjne.",
    rank: 3,
    share: "11%",
  },
  {
    id: "clipboard",
    name: "Clipboardy A4",
    badge: null,
    icon: ClipboardList,
    description: "Funkcjonalny clipboard w formacie A4 z pełnym brandingiem. Doskonały do codziennego użytku w biurze.",
    rank: 4,
    share: "9%",
  },
  {
    id: "segregator",
    name: "Segregatory A4",
    badge: null,
    icon: BookOpen,
    description: "Personalizowane segregatory A4 z nadrukiem. Trwałe i praktyczne — widoczność marki każdego dnia.",
    rank: 5,
    share: "8%",
  },
];

type Experience = "mam-dostawce" | "nie-kupuje";

interface ProductSelection {
  productId: string;
  experience: Experience;
  currentSupplier?: string;
}

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
      <header className="border-b border-border bg-card">
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
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          <Badge className="mb-6 bg-accent text-accent-foreground px-4 py-1.5 text-sm font-semibold">
            <TrendingUp className="mr-1.5 h-4 w-4" /> Dane z rynku drukarni reklamowych
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Te <span className="text-primary">5 produktów</span> generuje{" "}
            <span className="text-primary">60%</span> sprzedaży w drukarni
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Sprawdź, które produkty najlepiej się sprzedają i wprowadź je do swojej oferty. Wybierz interesujące Cię produkty, a my pomożemy Ci je wdrożyć.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Zobacz TOP 5 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card/50">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-border px-4 py-10">
          {[
            { value: "60%", label: "sprzedaży z TOP 5" },
            { value: "5", label: "sprawdzonych produktów" },
            { value: "100+", label: "zadowolonych agencji" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 text-center">
              <div className="text-3xl font-extrabold text-primary md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">Ranking TOP 5 produktów</h2>
          <p className="mt-3 text-muted-foreground">
            Kliknij produkt, aby go wybrać, a następnie opisz swoje doświadczenie.
          </p>
        </div>

        <div className="space-y-6">
          {products.map((product) => {
            const selected = !!selections[product.id];
            const Icon = product.icon;

            return (
              <Card
                key={product.id}
                className={`transition-all duration-200 cursor-pointer ${
                  selected
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:shadow-md hover:border-primary/30"
                }`}
              >
                <div onClick={() => toggleProduct(product.id)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <span className="text-xl font-black text-primary">#{product.rank}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          {product.badge && (
                            <Badge className="bg-accent text-accent-foreground text-xs font-bold">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-2xl font-bold text-primary">{product.share}</div>
                        <span className="text-xs text-muted-foreground">udział w sprzedaży</span>
                      </div>
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        selected ? "border-primary bg-primary" : "border-border"
                      }`}>
                        {selected && <CheckCircle2 className="h-5 w-5 text-primary-foreground" />}
                      </div>
                    </div>
                  </CardHeader>
                </div>

                {selected && (
                  <CardContent className="border-t border-border pt-4">
                    <Label className="text-sm font-semibold text-foreground mb-3 block">
                      Jakie masz doświadczenie z tym produktem?
                    </Label>
                    <RadioGroup
                      value={selections[product.id]?.experience}
                      onValueChange={(val) => setExperience(product.id, val as Experience)}
                      className="space-y-3"
                    >
                      <div className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="mam-dostawce" id={`${product.id}-a`} className="mt-0.5" />
                        <div>
                          <Label htmlFor={`${product.id}-a`} className="cursor-pointer font-medium">
                            Mam już dostawcę — chętnie porównam
                          </Label>
                          {selections[product.id]?.experience === "mam-dostawce" && (
                            <div className="mt-2">
                              <Input
                                placeholder="Obecny dostawca (nieobowiązkowo)"
                                value={selections[product.id]?.currentSupplier || ""}
                                onChange={(e) => setSupplier(product.id, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="max-w-xs"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="nie-kupuje" id={`${product.id}-b`} className="mt-0.5" />
                        <Label htmlFor={`${product.id}-b`} className="cursor-pointer font-medium">
                          Jeszcze nie kupuję, ale chętnie wdrożę
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* CTA after products */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
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
        </div>
      </section>

      {/* Coupon section */}
      <section className="border-t border-border bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
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
            <div className="mt-6">
              <div className="inline-block rounded-xl border-2 border-dashed border-primary bg-card px-8 py-5">
                <p className="text-sm text-muted-foreground mb-1">Twój kod rabatowy:</p>
                <p className="text-3xl font-black tracking-widest text-primary">FIRST10</p>
                <p className="mt-2 text-sm text-muted-foreground">10% zniżki na pierwsze zamówienie</p>
              </div>
            </div>
          )}
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
