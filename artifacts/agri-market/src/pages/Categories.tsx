import { Layout } from "@/components/layout";
import { useListCategories } from "@workspace/api-client-react";
import { LoadingState } from "@/components/loading-state";
import { Link } from "wouter";
import { Sprout } from "lucide-react";

export default function Categories() {
  const { data, isLoading } = useListCategories();

  return (
    <Layout>
      <div className="bg-primary/5 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] bg-repeat" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Catégories <span className="font-arabic text-3xl opacity-70 ml-2">الفئات</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Explorez notre large sélection de produits agricoles classés par catégories pour faciliter votre recherche.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        {isLoading ? (
          <LoadingState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/products?categoryId=${cat.id}`}
                className="group block bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Decorative bg */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                
                <div className="p-8 flex flex-col items-center text-center relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-white shadow-sm">
                    {cat.icon || <Sprout />}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <h4 className="text-muted-foreground font-arabic mb-4" dir="rtl">{cat.nameAr}</h4>
                  
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {cat.description}
                  </p>
                  
                  <div className="mt-auto inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-secondary/50 text-sm font-medium text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {cat.productCount} Annonces
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
