import { Link } from "wouter";
import { Seller } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShieldCheck, ShoppingBasket, Calendar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function SellerCard({ seller }: { seller: Seller }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-border/50 bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative">
      <Link href={`/sellers/${seller.id}`} className="absolute inset-0 z-10" />
      
      <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20 relative">
        {/* Cover pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] bg-repeat" />
      </div>
      
      <CardContent className="px-6 pt-0 pb-6 relative">
        <div className="flex justify-between items-start">
          <div className="relative -mt-10 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg shadow-black/5 relative z-20">
              <div className="w-full h-full rounded-xl bg-secondary flex items-center justify-center overflow-hidden border border-border">
                {seller.profileImage ? (
                  <img src={seller.profileImage} alt={seller.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-primary/50">{seller.name.charAt(0)}</span>
                )}
              </div>
            </div>
            {seller.verified && (
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 z-30 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-success fill-success/10" />
              </div>
            )}
          </div>
          
          <div className="pt-3">
            <Badge variant="outline" className="flex items-center gap-1 font-normal bg-white">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="font-bold text-foreground">{seller.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({seller.reviewCount})</span>
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
              {seller.name}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
              <span className="font-medium">{seller.wilayaName}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {seller.bio || "Agriculteur partenaire sur Fellah Market proposant des produits frais et de qualité."}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
            <div className="flex flex-col gap-1 bg-secondary/50 rounded-lg p-2.5">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                <ShoppingBasket className="w-3.5 h-3.5" /> Produits
              </span>
              <span className="font-bold text-foreground">{seller.productCount} disponibles</span>
            </div>
            <div className="flex flex-col gap-1 bg-secondary/50 rounded-lg p-2.5">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Membre depuis
              </span>
              <span className="font-bold text-foreground capitalize">
                {format(new Date(seller.joinedAt), "MMM yyyy", { locale: fr })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
