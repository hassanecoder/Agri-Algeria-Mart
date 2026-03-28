import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Sprout, 
  MapPin, 
  TrendingUp, 
  ShoppingBasket, 
  Users, 
  Menu, 
  X,
  ChevronRight,
  Phone
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/products", label: "Produits", labelAr: "المنتجات", icon: ShoppingBasket },
    { href: "/categories", label: "Catégories", labelAr: "الفئات", icon: Sprout },
    { href: "/sellers", label: "Agriculteurs", labelAr: "الفلاحين", icon: Users },
    { href: "/marche", label: "Marché", labelAr: "السوق", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background/95 relative overflow-x-hidden">
      {/* Decorative gradient blur at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-primary/5 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md border-border/50 shadow-sm py-3" 
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none text-foreground tracking-tight">Fellah Market</span>
                <span className="text-xs text-primary font-medium flex items-center gap-1">
                  فلاح ماركت <span className="w-1 h-1 rounded-full bg-accent inline-block"></span> DZ
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = location.startsWith(link.href);
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 group ${
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <link.icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                    <span>{link.label}</span>
                    <span className="text-[10px] opacity-70 font-arabic ml-1">{link.labelAr}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild className="rounded-full font-medium hover:bg-secondary">
                <Link href="/contact">Contact</Link>
              </Button>
              <Button className="rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                Vendre <span className="font-arabic text-xs ml-1 opacity-80">بيع</span>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white/95 backdrop-blur-xl border-b border-border shadow-xl md:hidden"
          >
            <div className="container px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.startsWith(link.href);
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "bg-secondary/50 text-foreground hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="font-medium text-lg">{link.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-arabic text-sm opacity-60">{link.labelAr}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </div>
                  </Link>
                );
              })}
              <div className="h-px w-full bg-border my-2" />
              <Link href="/contact" className="p-4 flex items-center justify-center gap-2 font-medium text-muted-foreground hover:text-foreground">
                <Phone className="w-4 h-4" /> Contact
              </Link>
              <Button className="w-full py-6 text-lg rounded-xl shadow-md">
                Commencer à Vendre <span className="font-arabic ml-2">ابدأ البيع</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto relative z-10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg">Fellah Market</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                La première plateforme algérienne connectant directement les agriculteurs aux acheteurs. 
                <span className="block mt-1 font-arabic opacity-80 text-right" dir="rtl">
                  المنصة الجزائرية الأولى لربط الفلاحين بالمشترين مباشرة.
                </span>
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-foreground flex items-center justify-between border-b pb-2">
                Découvrir <span className="font-arabic text-sm opacity-60 font-normal">اكتشف</span>
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors flex justify-between">Tous les produits <span className="font-arabic text-[10px]">المنتجات</span></Link></li>
                <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors flex justify-between">Catégories <span className="font-arabic text-[10px]">الفئات</span></Link></li>
                <li><Link href="/sellers" className="text-muted-foreground hover:text-primary transition-colors flex justify-between">Nos Agriculteurs <span className="font-arabic text-[10px]">فلاحونا</span></Link></li>
                <li><Link href="/marche" className="text-muted-foreground hover:text-primary transition-colors flex justify-between">Prix du marché <span className="font-arabic text-[10px]">الأسعار</span></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-foreground flex items-center justify-between border-b pb-2">
                Aide & Info <span className="font-arabic text-sm opacity-60 font-normal">معلومات</span>
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex justify-between">À propos <span className="font-arabic text-[10px]">من نحن</span></Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex justify-between">Contact <span className="font-arabic text-[10px]">اتصل بنا</span></Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors flex justify-between">Conditions d'utilisation <span className="font-arabic text-[10px]">الشروط</span></a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-foreground flex items-center justify-between border-b pb-2">
                Contact <span className="font-arabic text-sm opacity-60 font-normal">تواصل</span>
              </h4>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>Alger, Algérie<br /><span className="font-arabic text-xs">الجزائر العاصمة</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span dir="ltr">+213 (0) 555 00 00 00</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} Fellah Market. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-muted-foreground">
                <span className="font-bold text-xs">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-muted-foreground">
                <span className="font-bold text-xs">IN</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
