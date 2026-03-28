import { Layout } from "@/components/layout";
import { Leaf, Users, ShieldCheck, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] bg-repeat" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Moderniser l'Agriculture en Algérie
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed mb-10">
              Fellah Market est né d'une vision simple : connecter directement ceux qui cultivent notre terre avec ceux qui la consomment, de manière transparente et équitable.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full shadow-xl text-primary hover:text-primary/90" asChild>
              <Link href="/sellers">Découvrir nos agriculteurs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden bg-secondary relative z-10 border-8 border-white shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80" 
                   alt="Agriculteur Algérien"
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute top-1/2 -left-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Notre Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pendant trop longtemps, le secteur agricole algérien a souffert d'une chaîne d'intermédiaires complexe qui réduit les revenus des agriculteurs et augmente les prix pour les consommateurs.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong>Fellah Market</strong> supprime ces barrières. Nous offrons une plateforme numérique où les agriculteurs des 48 wilayas peuvent lister leurs récoltes, fixer leurs prix de manière transparente, et atteindre un marché national en quelques clics.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <div className="font-extrabold text-4xl text-primary mb-2">48</div>
                  <div className="font-medium text-foreground">Wilayas Couvertes</div>
                </div>
                <div>
                  <div className="font-extrabold text-4xl text-accent mb-2">10k+</div>
                  <div className="font-medium text-foreground">Agriculteurs Inscrits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Nos Valeurs Fondamentales</h2>
            <p className="text-muted-foreground">Ce qui guide chaque décision que nous prenons pour la plateforme.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Transparence", desc: "Des prix clairs et justes affichés publiquement pour tous." },
              { icon: Users, title: "Communauté", desc: "Renforcer les liens sociaux entre producteurs et acheteurs locaux." },
              { icon: Leaf, title: "Qualité", desc: "Mise en avant des produits frais, locaux et de saison." },
              { icon: Globe, title: "Innovation", desc: "Apporter le meilleur de la technologie au service de la terre." }
            ].map((value, i) => (
              <div key={i} className="bg-card p-8 rounded-3xl border border-border shadow-sm text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
