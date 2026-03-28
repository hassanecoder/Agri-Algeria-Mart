import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout";
import { LoadingState } from "@/components/loading-state";
import { ProductCard } from "@/components/product-card";
import { ContactDialog } from "@/components/contact-dialog";
import { useGetSeller, useListProducts } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, ShieldCheck, Package, Calendar, ArrowLeft, MessageCircle } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function SellerProfile() {
  const { id } = useParams<{ id: string }>();
  const [contactOpen, setContactOpen] = useState(false);
  const { data: seller, isLoading } = useGetSeller(id!);
  const { data: productsData, isLoading: isLoadingProducts } = useListProducts({ sellerId: id, limit: 12 });

  if (isLoading) return <Layout><LoadingState message="Chargement du profil..." /></Layout>;

  if (!seller) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Vendeur introuvable</h1>
          <p className="text-muted-foreground mb-8">Ce profil n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link href="/sellers">Retour aux vendeurs</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const joinedDate = seller.joinedAt ? format(new Date(seller.joinedAt), "MMMM yyyy", { locale: fr }) : "";

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <Button variant="ghost" className="mb-6 gap-2" asChild>
          <Link href="/sellers">
            <ArrowLeft className="h-4 w-4" />
            Retour aux vendeurs
          </Link>
        </Button>

        {/* Profile Header */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <img
                src={seller.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${seller.name}`}
                alt={seller.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary/20 shadow"
              />
              {seller.verified && (
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5 shadow">
                  <ShieldCheck className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{seller.name}</h1>
                {seller.verified && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Vendeur vérifié
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {seller.wilayaName}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-primary" />
                  {seller.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary" />
                  Membre depuis {joinedDate}
                </span>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6 max-w-2xl">{seller.bio}</p>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="text-xl font-bold text-foreground">{seller.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{seller.reviewCount} avis</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground flex items-center gap-1 justify-center">
                    <Package className="h-5 w-5 text-primary" />
                    {seller.productCount}
                  </div>
                  <p className="text-xs text-muted-foreground">Produits</p>
                </div>
              </div>

              <Button onClick={() => setContactOpen(true)} className="gap-2 rounded-full shadow">
                <MessageCircle className="h-4 w-4" />
                Contacter le vendeur
              </Button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          Produits de {seller.name}
        </h2>

        {isLoadingProducts ? (
          <LoadingState message="Chargement des produits..." />
        ) : productsData?.products && productsData.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsData.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Aucun produit disponible pour ce vendeur.</p>
          </div>
        )}
      </div>

      {seller && (
        <ContactDialog
          open={contactOpen}
          onOpenChange={setContactOpen}
          sellerId={seller.id}
          sellerName={seller.name}
        />
      )}
    </Layout>
  );
}
