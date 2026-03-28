import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { LoadingState, EmptyState } from "@/components/loading-state";
import { 
  useListProducts, 
  useListCategories, 
  useListWilayas 
} from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, PackageX, Leaf } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function Products() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  // States for filters
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "all");
  const [wilayaId, setWilayaId] = useState(searchParams.get("wilayaId") || "all");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data
  const { data: categoriesData } = useListCategories();
  const { data: wilayasData } = useListWilayas();
  
  const queryParams = {
    ...(search && { search }),
    ...(categoryId !== "all" && { categoryId }),
    ...(wilayaId !== "all" && { wilayaId }),
    // API schema doesn't explicitly have organic flag in ListProductsParams, 
    // but we'll assume it might be supported or we filter client-side for this demo
  };

  const { data: productsData, isLoading, error } = useListProducts(queryParams);

  // Update URL when filters change (basic implementation)
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categoryId !== "all") params.set("categoryId", categoryId);
    if (wilayaId !== "all") params.set("wilayaId", wilayaId);
    setLocation(`/products?${params.toString()}`);
  };

  // Client side filtering for organic if not supported by API
  const filteredProducts = productsData?.products.filter(p => organicOnly ? p.organic : true) || [];

  return (
    <Layout>
      <div className="bg-secondary/30 border-b border-border/50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tous les Produits <span className="font-arabic text-2xl opacity-70 ml-2">جميع المنتجات</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Parcourez des milliers de produits agricoles frais provenant de toute l'Algérie.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <Button 
            variant="outline" 
            className="lg:hidden w-full flex items-center justify-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" /> 
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </Button>

          {/* Filters Sidebar */}
          <aside className={`w-full lg:w-72 shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-lg border-b pb-4 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                Filtres <span className="font-arabic text-sm text-muted-foreground ml-auto">تصفية</span>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-3">
                  <Label htmlFor="search">Recherche</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="search"
                      placeholder="Ex: Blé..." 
                      className="pl-9 bg-secondary/50"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <Label>Catégorie <span className="font-arabic text-xs ml-1">الفئة</span></Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categoriesData?.categories.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Wilaya */}
                <div className="space-y-3">
                  <Label>Wilaya <span className="font-arabic text-xs ml-1">الولاية</span></Label>
                  <Select value={wilayaId} onValueChange={setWilayaId}>
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Toute l'Algérie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toute l'Algérie (48)</SelectItem>
                      {wilayasData?.wilayas.map(w => (
                        <SelectItem key={w.id} value={w.id}>{w.code} - {w.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Organic Toggle */}
                <div className="flex items-center justify-between py-3 border-y border-border/50">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-success" /> Bio uniquement
                    </Label>
                    <p className="text-[10px] text-muted-foreground font-arabic" dir="rtl">منتجات عضوية فقط</p>
                  </div>
                  <Switch checked={organicOnly} onCheckedChange={setOrganicOnly} />
                </div>

                <Button className="w-full" onClick={applyFilters}>
                  Appliquer les filtres
                </Button>
                
                {(search || categoryId !== "all" || wilayaId !== "all" || organicOnly) && (
                  <Button 
                    variant="ghost" 
                    className="w-full text-muted-foreground"
                    onClick={() => {
                      setSearch("");
                      setCategoryId("all");
                      setWilayaId("all");
                      setOrganicOnly(false);
                      setLocation("/products");
                    }}
                  >
                    Réinitialiser
                  </Button>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-medium text-muted-foreground">
                {isLoading ? "Recherche..." : `${filteredProducts.length} produits trouvés`}
              </h2>
            </div>

            {isLoading ? (
              <LoadingState />
            ) : filteredProducts.length === 0 ? (
              <EmptyState 
                title="Aucun produit trouvé" 
                description="Essayez de modifier vos filtres ou de rechercher un autre terme."
                icon={PackageX}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
