import { Link } from "wouter";
import { Product } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Leaf, Scale } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  // Use first image or a placeholder
  const imageUrl = product.images?.[0] || "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop";

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/50 bg-white hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge variant="default" className="shadow-md font-medium tracking-wide">
              En vedette <span className="ml-1 text-[10px] font-arabic">مميز</span>
            </Badge>
          )}
          {product.organic && (
            <Badge variant="success" className="shadow-md flex items-center gap-1">
              <Leaf className="w-3 h-3" /> Bio <span className="ml-1 text-[10px] font-arabic">عضوي</span>
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-foreground shadow-sm">
            {product.categoryName}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 gap-2">
          <div>
            <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              <Link href={`/products/${product.id}`} className="after:absolute after:inset-0">
                {product.name}
              </Link>
            </h3>
            <p className="text-sm font-arabic text-muted-foreground" dir="rtl">{product.nameAr}</p>
          </div>
          {product.rating > 0 && (
            <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-md text-xs font-semibold shrink-0">
              <Star className="w-3 h-3 fill-current" />
              {product.rating.toFixed(1)}
            </div>
          )}
        </div>

        <div className="mt-auto space-y-3 pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
            <span className="truncate">{product.wilayaName}</span>
          </div>
          
          <div className="flex items-center justify-between border-t border-border/50 pt-3">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium mb-0.5">Prix / السعر</span>
              <div className="flex items-baseline gap-1 text-foreground">
                <span className="font-bold text-xl">{product.price.toLocaleString()}</span>
                <span className="text-sm font-medium">DZD</span>
                <span className="text-xs text-muted-foreground ml-1">/{product.unit}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground font-medium mb-0.5">Min commande</span>
              <div className="flex items-center gap-1.5 text-sm font-medium bg-secondary px-2 py-1 rounded-md">
                <Scale className="w-3.5 h-3.5" />
                {product.minOrder} {product.unit}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
