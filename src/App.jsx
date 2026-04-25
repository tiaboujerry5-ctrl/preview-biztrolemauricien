
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Menu", href: "#services" },
  { label: "Service Traiteur", href: "#services" },
  { label: "À Propos", href: "#about" },
];

const SERVICES = [
  {
    icon: "🍽️",
    title: "Cuisine Bistronomique",
    description:
      "L'alliance parfaite entre l'esprit convivial du bistrot et la rigueur de la grande gastronomie. Des plats dignes d'un chef étoilé à des prix accessibles.",
  },
  {
    icon: "🌙",
    title: "Menu Soir",
    description:
      "Du mercredi au samedi, de 17h à 22h. Une expérience culinaire raffinée pour vos soirées, dans une ambiance chaleureuse et authentique.",
  },
  {
    icon: "☀️",
    title: "Brunch du Dimanche",
    description:
      "Le dimanche de 9h à 14h, venez savourer notre brunch généreux, inspiré des saveurs du terroir québécois et des grandes tables.",
  },
  {
    icon: "🥂",
    title: "Service Traiteur",
    description:
      "Nous apportons notre savoir-faire gastronomique à vos événements privés, mariages, et célébrations d'entreprise.",
    link: "https://biztrolemauricien.com/service-traiteur/",
    linkLabel: "En savoir plus",
  },
  {
    icon: "🎁",
    title: "Carte Cadeau Virtuelle",
    description:
      "Offrez une expérience gastronomique inoubliable. Achetez une carte cadeau virtuelle en ligne, disponible en tout temps.",
    link: "https://www.freebeespay.com/fr/PointSale/Purchase/5312",
    linkLabel: "Acheter maintenant",
  },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Button({ children, href, onClick, variant = "primary", className = "" }) {
  const base =
    "inline-block font-semibold tracking-wide px-6 py-3 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#b5452a] focus:ring-offset-2 focus:ring-offset-[#1a0f07]";
  const styles =
    variant === "primary"
      ? "bg-[#b5452a] text-[#f5ede0] hover:bg-[#8f3520] active:scale-95"
      : "border border-[#b5452a] text-[#b5452a] hover:bg-[#b5452a] hover:text-[#f5ede0] active:scale-95";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

function ServiceCard({ icon, title, description, link, linkLabel }) {
  return (
    <div className="bg-[#2c1a0e] border border-[#b5452a] text-[#f5ede0] rounded-xl p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_2px_rgba(181,69,42,0.35)] group">
      <div className="text-4xl mb-1">{icon}</div>
      <h3 className="text-xl font-bold text-[#b5452a] font-serif">{title}</h3>
      <p className="text-[#f0e6d3] text-sm leading-relaxed flex-1">{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-[#b5452a] text-sm font-semibold border-b border-[#b5452a] self-start hover:text-[#f5ede0] transition-colors"
        >
          {linkLabel} →
        </a>
      )}
    </div>
  );
}

function ServiceCardSkeleton() {
  return (
    <div className="bg-[#2c1a0e] border border-[#3d2510] rounded-xl p-6 flex flex-col gap-3 animate-pulse">
      <div className="w-10 h-10 bg-[#3d2510] rounded-full mb-1" />
      <div className="h-5 bg-[#3d2510] rounded w-3/4" />
      <div className="h-3 bg-[#3d2510] rounded w-full" />
      <div className="h-3 bg-[#3d2510] rounded w-5/6" />
      <div className="h-3 bg-[#3d2510] rounded w-4/6" />
    </div>
  );
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#b5452a] text-[#f5ede0] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
      <span className="text-xl">✓</span>
      <span className="text-sm font-semibold">{message}</span>
      <button onClick={onClose} className="ml-2 text-[#f5ede0] opacity-70 hover:opacity-100 text-lg leading-none">×</button>
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 bg-[#2c1a0e] text-[#f0e6d3] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_32px_rgba(0,0,0,0.5)]" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#accueil" className="flex-shrink-0">
            <img
              src="https://mdceqvjsrzkvnrigaili.supabase.co/storage/v1/object/public/site-assets/BiztroLeMauricien/8629171376872484672.png"
              alt="Biztro Le Mauricien"
              className="h-10 object-contain"
            />
          </a>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#f0e6d3] hover:text-[#b5452a] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button href="tel:8195235007" variant="primary" className="text-sm px-5 py-2">
              Réserver une Table
            </Button>
          </div>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded focus:outline-none"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <span className="block w-6 h-0.5 bg-[#f0e6d3]" />
            <span className="block w-6 h-0.5 bg-[#f0e6d3]" />
            <span className="block w-6 h-0.5 bg-[#f0e6d3]" />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#2c1a0e] text-[#f0e6d3] flex flex-col p-8 gap-8 shadow-2xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <img
            src="https://mdceqvjsrzkvnrigaili.supabase.co/storage/v1/object/public/site-assets/BiztroLeMauricien/8629171376872484672.png"
            alt="Biztro Le Mauricien"
            className="h-9 object-contain"
          />
          <button onClick={() => setMenuOpen(false)} className="text-2xl leading-none text-[#f0e6d3] hover:text-[#b5452a]">
            ×
          </button>
        </div>
        <nav className="flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-[#b5452a] transition-colors border-b border-[#3d2510] pb-3"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button href="tel:8195235007" variant="primary" className="text-center mt-auto">
          Réserver une Table
        </Button>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center bg-[#1a0f07] overflow-hidden"
      style={{
        backgroundImage:
          "url('https://mdceqvjsrzkvnrigaili.supabase.co/storage/v1/object/public/site-assets/BiztroLeMauricien/1441252718352504669.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f07]/80 via-[#1a0f07]/60 to-[#1a0f07]/95" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6 pt-20">
        <span className="text-[#b5452a] uppercase tracking-[0.25em] text-xs font-semibold border border-[#b5452a] px-4 py-1 rounded-full">
          Cuisine Bistronomique · La Tuque, QC
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f0e6d3] font-serif leading-tight">
          Gastronomie de Chef,{" "}
          <span className="text-[#b5452a]">Ambiance Bistrot</span>{" "}
          Authentique
        </h1>
        <blockquote className="text-[#f0e6d3]/80 text-base sm:text-lg italic max-w-xl leading-relaxed border-l-2 border-[#b5452a] pl-4 text-left">
          «La bistronomie est la contraction des termes «bistro» et «gastronomie» — un nouveau concept culinaire mélangeant l'esprit bistro et la qualité de la belle gastronomie.»
        </blockquote>
        <p className="text-[#b5452a] text-sm font-semibold tracking-widest uppercase">— Camille Inglebert</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button href="tel:8195235007" variant="primary" className="text-base px-8 py-3">
            Réserver une Table
          </Button>
          <Button href="https://www.freebeespay.com/fr/PointSale/Purchase/5312" variant="secondary" className="text-base px-8 py-3">
            Carte Cadeau Virtuelle
          </Button>
        </div>
        <div className="mt-6 flex gap-8 text-[#f0e6d3]/70 text-sm">
          <div className="text-center">
            <div className="text-[#b5452a] font-bold text-xs uppercase tracking-widest mb-1">Mer – Sam</div>
            <div>Menu Soir · 17h – 22h</div>
          </div>
          <div className="w-px bg-[#b5452a]/40" />
          <div className="text-center">
            <div className="text-[#b5452a] font-bold text-xs uppercase tracking-widest mb-1">Dimanche</div>
            <div>Brunch · 9h – 14h</div>
          </div>
        </div>
      </div>
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#b5452a] animate-bounce"
        aria-label="Défiler vers le bas"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}

function Services() {
  const { ref, visible } = useScrollReveal();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setLoaded(true), 600);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <section
      id="services"
      ref={ref}
      className={`bg-[#1a0f07] py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#b5452a] uppercase tracking-[0.2em] text-xs font-semibold">Nos Offres</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0e6d3] font-serif mt-2">
            Ce que nous vous proposons
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-[#b5452a] mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loaded
            ? SERVICES.map((_, i) => <ServiceCardSkeleton key={i} />)
            : SERVICES.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      id="about"
      ref={ref}
      className={`bg-[#2c1a0e] py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-5">
          <span className="text-[#b5452a] uppercase tracking-[0.2em] text-xs font-semibold">Notre Histoire</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0e6d3] font-serif leading-snug">
            La bistronomie, ou quand la gastronomie s'invite au bistrot.
          </h2>
          <div className="w-14 h-0.5 bg-[#b5452a]" />
          <p className="text-[#f0e6d3]/80 leading-relaxed text-base">
            Chez Biztro Le Mauricien, nous croyons que la grande cuisine ne devrait pas être réservée aux grandes occasions. Notre cuisine bistronomique marie l'authenticité et la convivialité du bistrot traditionnel avec la précision et la créativité des tables gastronomiques.
          </p>
          <p className="text-[#f0e6d3]/80 leading-relaxed text-base">
            Chaque assiette est pensée avec soin, chaque ingrédient sélectionné avec passion — pour vous offrir une expérience culinaire mémorable au cœur de La Tuque, Québec.
          </p>
          <Button href="tel:8195235007" variant="primary" className="self-start mt-2">
            Réserver une Table
          </Button>
        </div>
        <div className="rounded-2xl overflow-hidden border border-[#b5452a]/40 shadow-2xl">
          <img
            src="https://mdceqvjsrzkvnrigaili.supabase.co/storage/v1/object/public/site-assets/BiztroLeMauricien/1441252718352504669.jpg"
            alt="Ambiance Biztro Le Mauricien"
            className="w-full h-96 object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className={`bg-[#b5452a] py-16 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#f5ede0] font-serif leading-snug">
          Offrez une Expérience Gastronomique Unique
        </h2>
        <p className="text-[#f5ede0]/90 text-base sm:text-lg">
          Réservez votre table ou offrez une carte cadeau dès aujourd'hui.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:8195235007"
            className="inline-block bg-[#f5ede0] text-[#b5452a] font-bold px-8 py-3 rounded hover:bg-white transition-colors active:scale-95"
          >
            Réserver une Table
          </a>
          <a
            href="https://www.freebeespay.com/fr/PointSale/Purchase/5312"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-[#f5ede0] text-[#f5ede0] font-bold px-8 py-3 rounded hover:bg-[#f5ede0] hover:text-[#b5452a] transition-colors active:scale-95"
          >
            Acheter une Carte Cadeau
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Veuillez entrer votre nom.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Adresse courriel invalide.";
    if (!form.message.trim()) e.message = "Veuillez entrer votre message.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    onSubmit();
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full bg-[#1a0f07] border border-[#3d2510] text-[#f0e6d3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#b5452a] transition-colors placeholder:text-[#f0e6d3]/30";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div>
        <input
          type="text"
          placeholder="Votre nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
        />
        {errors.name && <p className="text-[#b5452a] text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Votre courriel"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
        {errors.email && <p className="text-[#b5452a] text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <textarea
          placeholder="Votre message…"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className="text-[#b5452a] text-xs mt-1">{errors.message}</p>}
      </div>
      <Button variant="primary" className="w-full text-center">
        Envoyer le message
      </Button>
    </form>
  );
}

function Contact() {
  const { ref, visible } = useScrollReveal();
  const [toast, setToast] = useState(false);

  return (
    <section
      id="contact"
      ref={ref}
      className={`bg-[#1a0f07] py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#b5452a] uppercase tracking-[0.2em] text-xs font-semibold">Contactez-nous</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0e6d3] font-serif mt-2">
            Trouvez-nous & Écrivez-nous
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-[#b5452a] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#2c1a0e] border border-[#b5452a]/30 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="text-[#b5452a] text-xl mt-0.5">📍</span>
                <div>
                  <div className="text-[#f0e6d3]/60 text-xs uppercase tracking-widest mb-1">Adresse</div>
                  <a
                    href="https://www.google.com/maps/dir/45.8719232,-73.2954624/biztro+le+mauricien+la+tuque/@46.4385604,-74.1964043,8z/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f0e6d3] hover:text-[#b5452a] transition-colors text-sm"
                  >
                    503 rue Commerciale, La Tuque, QC G9X 3A7
                  </a>
                </div>
              </div>
              <div className="border-t border-[#3d2510]" />
              <div className="flex items-start gap-3">
                <span className="text-[#b5452a] text-xl mt-0.5">📞</span>
                <div>
                  <div className="text-[#f0e6d3]/60 text-xs uppercase tracking-widest mb-1">Téléphone</div>
                  <a href="tel:8195235007" className="text-[#f0e6d3] hover:text-[#b5452a] transition-colors text-sm font-semibold">
                    (819) 523-5007
                  </a>
                </div>
              </div>
              <div className="border-t border-[#3d2510]" />
              <div className="flex items-start gap-3">
                <span className="text-[#b5452a] text-xl mt-0.5">✉️</span>
                <div>
                  <div className="text-[#f0e6d3]/60 text-xs uppercase tracking-widest mb-1">Courriel</div>
                  <a
                    href="mailto:biztrolemauricien@gmail.com"
                    className="text-[#f0e6d3] hover:text-[#b5452a] transition-colors text-sm"
                  >
                    biztrolemauricien@gmail.com
                  </a>
                </div>
              </div>
              <div className="border-t border-[#3d2510]" />
              <div className="flex items-start gap-3">
                <span className="text-[#b5452a] text-xl mt-0.5">🕐</span>
                <div>
                  <div className="text-[#f0e6d3]/60 text-xs uppercase tracking-widest mb-2">Horaires</div>
                  <div className="flex flex-col gap-1 text-sm text-[#f0e6d3]">
                    <div className="flex justify-between gap-6">
                      <span className="text-[#b5452a] font-semibold">Mer – Sam</span>
                      <span>Menu Soir · 17h – 22h</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span className="text-[#b5452a] font-semibold">Dimanche</span>
                      <span>Brunch · 9h – 14h</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span className="text-[#f0e6d3]/50">Lun – Mar</span>
                      <span className="text-[#f0e6d3]/50">Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/45.8719232,-73.2954624/biztro+le+mauricien+la+tuque/@46.4385604,-74.1964043,8z/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#b5452a] text-sm font-semibold hover:text-[#f5ede0] transition-colors"
            >
              <span>📍</span> Voir sur Google Maps →
            </a>
          </div>

          {/* Form */}
          <div className="bg-[#2c1a0e] border border-[#b5452a]/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-[#f0e6d3] font-serif mb-5">Envoyez-nous un message</h3>
            <ContactForm onSubmit={() => setToast(true)} />
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message="Message envoyé avec succès! Nous vous répondrons bientôt."
          onClose={() => setToast(false)}
        />
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2c1a0e] border-t border-[#b5452a]/20 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <img
          src="https://mdceqvjsrzkvnrigaili.supabase.co/storage/v1/object/public/site-assets/BiztroLeMauricien/8629171376872484672.png"
          alt="Biztro Le Mauricien"
          className="h-12 object-contain"
        />
        <nav className="flex flex-wrap justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#f0e6d3]/70 hover:text-[#b5452a] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="https://www.facebook.com/biztrolemauricien"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#f0e6d3]/70 hover:text-[#b5452a] transition-colors text-sm"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
          Facebook
        </a>
        <div className="border-t border-[#3d2510] w-full pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#f0e6d3]/40">
          <span>© {new Date().getFullYear()} Biztro Le Mauricien. Tous droits réservés.</span>
          <a href="http://excosodi.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#b5452a] transition-colors">
            Hébergé par excosodi.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#1a0f07] font-serif">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;600;700&display=swap');
        body { font-family: 'Lato', sans-serif; }
        h1, h2, h3, h4, blockquote { font-family: 'Playfair Display', serif; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.35s ease both; }
      `}</style>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <CTABanner />
      <Contact />
      <Footer />
    </div>
  );
}
