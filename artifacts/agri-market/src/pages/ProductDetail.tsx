import { useParams } from "wouter";
import { Layout } from "@/components/layout";
import { LoadingState, ErrorState } from "@/components/loading-state";
import { useGetProduct, useGetSeller } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Star, 
  Leaf, 
  Scale, 
  Calendar, 
  ChevronRight, 
  Phone,
  MessageSquare,
  ShieldCheck
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "wouter";
import { useState } from "react";
import { ContactDialog } from "@/components/contact-dialog";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProduct(id || "");
  const { data: seller } = useGetSeller(product?.sellerId || "", { query: { enabled: !!product?.sellerId } });
  
  const [activeImage, setActiveImage] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);

  if (isLoading) return <Layout><LoadingState message="Chargement du produit..." /></Layout>;
  if (error || !product) return <Layout><ErrorState error={error} /></Layout>;

  const images = product.images?.length > 0 ? product.images : ["https://images.unsplash.com/photo-1595859730520-ca92f15e865f?w=1200&h=800&fit=crop"];

  return (
    <Layout>
      <div className="bg-secondary/30 border-b border-border/50 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link href="/products" className="hover:text-primary transition-colors">Produits</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link href={`/products?categoryId=${product.categoryId}`} className="hover:text-primary transition-colors">{product.categoryName}</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Images Section */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-border shadow-sm relative group">
              <img 
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.organic && (
                <div className="absolute top-4 left-4">
                  <Badge variant="success" className="shadow-lg py-1 px-3 text-sm">
                    <Leaf className="w-4 h-4 mr-1.5" /> Bio <span className="ml-2 font-arabic opacity-80">عضوي</span>
                  </Badge>
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary shadow-md' : 'border-transparent hover:border-primary/50 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">{product.name}</h1>
                <h2 className="text-xl text-muted-foreground font-arabic" dir="rtl">{product.nameAr}</h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 mb-6">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {product.categoryName}
              </Badge>
              {product.rating > 0 && (
                <div className="flex items-center gap-1.5 text-amber-500 font-bold bg-amber-50 px-3 py-1 rounded-full text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  {product.rating.toFixed(1)} <span className="text-muted-foreground font-normal ml-1">({product.reviewCount} avis)</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 text-primary" />
                {product.wilayaName}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-sm text-muted-foreground font-medium mb-1 block">Prix de vente <span className="font-arabic text-xs">سعر البيع</span></span>
                  <div className="flex items-baseline gap-2 text-foreground">
                    <span className="font-extrabold text-4xl text-primary">{product.price.toLocaleString()}</span>
                    <span className="text-xl font-bold">DZD</span>
                    <span className="text-muted-foreground">/ {product.unit}</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-white/60 p-3 rounded-xl backdrop-blur-sm border border-white">
                    <span className="text-xs text-muted-foreground block mb-1">Commande Min.</span>
                    <div className="flex items-center gap-2 font-bold text-foreground">
                      <Scale className="w-4 h-4 text-accent" />
                      {product.minOrder} {product.unit}
                    </div>
                  </div>
                  <div className="bg-white/60 p-3 rounded-xl backdrop-blur-sm border border-white">
                    <span className="text-xs text-muted-foreground block mb-1">Stock dispo.</span>
                    <div className="font-bold text-foreground">
                      {product.stock > 0 ? (
                        <span className="text-success">{product.stock} {product.unit}</span>
                      ) : (
                        <span className="text-destructive">Rupture</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-white">#{tag}</Badge>
                ))}
              </div>
            )}

            <Separator className="my-2" />

            {/* Seller Info */}
            <div className="mt-6 pt-6">
              <h3 className="text-lg font-bold mb-4">Vendu par <span className="font-arabic font-normal text-muted-foreground">البائع</span></h3>
              
              <Card className="border-border/50 shadow-sm bg-white/50">
                <CardContent className="p-4 sm:p-6">
                  {seller ? (
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-secondary overflow-hidden border-2 border-primary/20 shrink-0">
                           {seller.profileImage ? (
                             <img src={seller.profileImage} alt={seller.name} className="w-full h-full object-cover" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary/50 bg-primary/5">
                               {seller.name.charAt(0)}
                             </div>
                           )}
                        </div>
                        <div>
                          <Link href={`/sellers/${seller.id}`} className="font-bold text-lg hover:text-primary transition-colors flex items-center gap-2">
                            {seller.name}
                            {seller.verified && <ShieldCheck className="w-4 h-4 text-success" />}
                          </Link>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {seller.wilayaName}</span>
                            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> {seller.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none gap-2 bg-white" onClick={() => window.location.href = `tel:${seller.phone}`}>
                          <Phone className="w-4 h-4" /> Appeler
                        </Button>
                        <Button className="flex-1 sm:flex-none gap-2 shadow-md shadow-primary/20" onClick={() => setContactOpen(true)}>
                          <MessageSquare className="w-4 h-4" /> Contacter
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-secondary animate-pulse rounded" />
                        <div className="h-3 w-24 bg-secondary animate-pulse rounded" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </div>

      <ContactDialog 
        open={contactOpen} 
        onOpenChange={setContactOpen} 
        sellerId={product.sellerId} 
        productName={product.name} 
      />
    </Layout>
  );
}
