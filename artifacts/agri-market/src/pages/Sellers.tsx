import { useState } from "react";
import { Layout } from "@/components/layout";
import { SellerCard } from "@/components/seller-card";
import { LoadingState } from "@/components/loading-state";
import { useListSellers, useListWilayas } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ShieldCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Sellers() {
  const { data: sellersData, isLoading } = useListSellers();
  const { data: wilayasData } = useListWilayas();
  
  const [search, setSearch] = useState("");
  const [wilayaId, setWilayaId] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Client-side filtering since API definition for sellers doesn't show query params
  const filteredSellers = sellersData?.sellers.filter(seller => {
    const matchSearch = seller.name.toLowerCase().includes(search.toLowerCase());
    const matchWilaya = wilayaId === "all" || seller.wilayaId === wilayaId;
    const matchVerified = !verifiedOnly || seller.verified;
    return matchSearch && matchWilaya && matchVerified;
  }) || [];

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] bg-repeat" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              Nos Agriculteurs Partenaires
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Découvrez et contactez directement les producteurs de toutes les régions d'Algérie.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-white/70" />
                <Input 
                  placeholder="Rechercher un agriculteur..."
                  className="pl-12 py-6 border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-full md:w-64">
              <Select value={wilayaId} onValueChange={setWilayaId}>
                <SelectTrigger className="bg-secondary/50 border-transparent">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <SelectValue placeholder="Toute l'Algérie" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toute l'Algérie</SelectItem>
                  {wilayasData?.wilayas.map(w => (
                    <SelectItem key={w.id} value={w.id}>{w.code} - {w.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-auto w-full md:w-auto bg-secondary/30 px-4 py-2 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-success" />
            <Label htmlFor="verified-mode" className="cursor-pointer">Vérifiés uniquement</Label>
            <Switch id="verified-mode" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
          </div>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : filteredSellers.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-2">Aucun agriculteur trouvé</h3>
            <p className="text-muted-foreground">Essayez de modifier vos filtres de recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSellers.map(seller => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
