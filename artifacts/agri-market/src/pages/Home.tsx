import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { LoadingState } from "@/components/loading-state";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { 
  Search, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Leaf, 
  Truck,
  Star
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: featuredData, isLoading: isLoadingFeatured } = useListProducts({ 
    featured: true, 
    limit: 4 
  });
  
  const { data: categoriesData, isLoading: isLoadingCategories } = useListCategories();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          {/* using the generated AI image from requirements */}
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-farm.png`}
            alt="Agriculture en Algérie" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Marché 100% Algérien <span className="font-arabic opacity-70">سوق جزائري 100٪</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
              Achetez et Vendez des <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Produits Agricoles</span> en Direct
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Connectez-vous avec les agriculteurs de toutes les wilayas. Des produits frais, des prix transparents, et sans intermédiaires.
              <span className="block mt-2 font-arabic text-right opacity-80" dir="rtl">
                تواصل مع فلاحي كل الولايات. منتجات طازجة، أسعار شفافة، وبدون وسطاء.
              </span>
            </p>

            {/* Search Bar */}
            <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl shadow-black/5 border border-white/50 flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Que recherchez-vous ? (ex: Blé, Pommes...)"
                  className="pl-12 py-6 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                size="lg" 
                className="rounded-xl py-6 px-8 text-base shadow-lg shadow-primary/20"
                asChild
              >
                <Link href={`/products${searchQuery ? `?search=${searchQuery}` : ''}`}>
                  Rechercher <span className="font-arabic ml-2">بحث</span>
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm font-medium text-foreground/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-success" />
                Agriculteurs vérifiés
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Prix du marché
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground flex flex-col">
                Explorez par Catégorie
                <span className="font-arabic text-xl font-normal text-muted-foreground mt-1">تصفح حسب الفئة</span>
              </h2>
            </div>
            <Button variant="ghost" className="hidden sm:flex group" asChild>
              <Link href="/categories">
                Voir tout <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {isLoadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-card rounded-2xl h-40 animate-pulse border border-border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {categoriesData?.categories.slice(0, 6).map((cat) => (
                <Link 
                  key={cat.id} 
                  href={`/products?categoryId=${cat.id}`}
                  className="group bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center text-foreground hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary group-hover:bg-primary/10 flex items-center justify-center text-3xl mb-4 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold mb-1">{cat.name}</h3>
                  <span className="font-arabic text-sm text-muted-foreground mb-2">{cat.nameAr}</span>
                  <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                    {cat.productCount} produits
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="flex items-center gap-2 text-accent font-bold mb-2">
                <Star className="w-5 h-5 fill-current" /> Produits en vedette
              </div>
              <h2 className="text-3xl font-bold text-foreground flex flex-col">
                Sélection du Moment
                <span className="font-arabic text-xl font-normal text-muted-foreground mt-1">اختيار اللحظة</span>
              </h2>
            </div>
            <Button variant="outline" className="group rounded-full" asChild>
              <Link href="/products?featured=true">
                Tous les vedettes <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-card rounded-2xl h-80 animate-pulse border border-border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredData?.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features/Value Prop */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] bg-repeat" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir Fellah Market ?</h2>
            <p className="text-primary-foreground/80 text-lg">
              La plateforme qui révolutionne le commerce agricole en Algérie.
              <span className="block mt-2 font-arabic" dir="rtl">المنصة التي تحدث ثورة في التجارة الزراعية في الجزائر.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "En Direct du Producteur",
                titleAr: "مباشرة من المنتج",
                desc: "Zéro intermédiaire. Achetez au meilleur prix tout en assurant un revenu juste pour l'agriculteur."
              },
              {
                icon: TrendingUp,
                title: "Prix du Marché Réels",
                titleAr: "أسعار السوق الحقيقية",
                desc: "Consultez notre mercuriale pour connaître les vrais prix des marchés de gros en Algérie."
              },
              {
                icon: Truck,
                title: "Réseau National (48 Wilayas)",
                titleAr: "شبكة وطنية",
                desc: "Trouvez des fournisseurs dans votre région ou à travers tout le territoire national."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <h4 className="font-arabic text-primary-foreground/80 mb-4" dir="rtl">{feature.titleAr}</h4>
                <p className="text-primary-foreground/90 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
