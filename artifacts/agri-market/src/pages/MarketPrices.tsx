import { Layout } from "@/components/layout";
import { useListMarketPrices, useListCategories } from "@workspace/api-client-react";
import { LoadingState } from "@/components/loading-state";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { TrendingUp, TrendingDown, Minus, Info, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MarketPrices() {
  const { data: marketData, isLoading } = useListMarketPrices();
  const { data: categoriesData } = useListCategories();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPrices = marketData?.prices.filter(p => 
    activeCategory === "all" || p.categoryName === activeCategory
  ) || [];

  // Group by category for cleaner display
  const groupedPrices = filteredPrices.reduce((acc, price) => {
    if (!acc[price.categoryName]) acc[price.categoryName] = [];
    acc[price.categoryName].push(price);
    return acc;
  }, {} as Record<string, typeof filteredPrices>);

  const renderTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-5 h-5 text-destructive" />; // Up is bad for buyers, but we'll just style it red for inflation
      case 'down': return <TrendingDown className="w-5 h-5 text-success" />; // Down is good
      default: return <Minus className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const renderTrendBadge = (trend: string, percent: number) => {
    if (trend === 'stable') return <Badge variant="secondary" className="font-normal text-xs">Stable</Badge>;
    const isUp = trend === 'up';
    return (
      <Badge variant="outline" className={`font-medium text-xs flex items-center gap-1 bg-white ${isUp ? 'text-destructive border-destructive/20' : 'text-success border-success/20'}`}>
        {isUp ? '+' : '-'}{percent}%
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-accent/10 to-transparent pt-12 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent-foreground font-medium text-sm mb-4">
                <TrendingUp className="w-4 h-4" /> Mercuriale Nationale
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Prix du Marché de Gros
              </h1>
              <p className="text-muted-foreground text-lg">
                Consultez les prix moyens pratiqués aujourd'hui dans les principaux marchés de gros en Algérie.
              </p>
            </div>
            
            <div className="bg-white px-4 py-3 rounded-xl border border-border shadow-sm flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground font-medium">Mise à jour</div>
                <div className="font-bold text-foreground">Aujourd'hui, 08:00</div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2 snap-x hide-scrollbar">
            <button
              onClick={() => setActiveCategory("all")}
              className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all" ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white text-foreground hover:bg-secondary border border-border/50"
              }`}
            >
              Tous les marchés
            </button>
            {categoriesData?.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.name ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white text-foreground hover:bg-secondary border border-border/50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-4 flex items-start gap-3 text-amber-800 mb-8">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            <strong>Note d'information :</strong> Les prix affichés sont des moyennes constatées au niveau des marchés de gros. Les prix au détail peuvent varier selon votre wilaya et les marges des distributeurs. Unité monétaire : DZD (Dinar Algérien).
          </p>
        </div>

        {isLoading ? (
          <LoadingState message="Actualisation des prix..." />
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedPrices).map(([category, prices]) => (
              <section key={category} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  {category}
                  <div className="h-px bg-border flex-1 ml-4" />
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {prices.map(price => (
                    <Card key={price.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="p-5 flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-foreground mb-1">{price.productName}</h3>
                            <p className="text-muted-foreground font-arabic text-sm" dir="rtl">{price.productNameAr}</p>
                            <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
                              Marché de ref: <strong className="text-foreground">{price.wilayaName}</strong>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {renderTrendIcon(price.trend)}
                            {renderTrendBadge(price.trend, price.changePercent)}
                          </div>
                        </div>
                        
                        <div className="bg-secondary/30 border-t border-border/50 px-5 py-4 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Fourchette (Min - Max)</span>
                            <div className="flex items-baseline gap-1 text-foreground">
                              <span className="font-extrabold text-xl">{price.priceMin}</span>
                              <span className="text-muted-foreground mx-1">-</span>
                              <span className="font-extrabold text-xl">{price.priceMax}</span>
                              <span className="text-sm font-medium ml-1">DZD</span>
                            </div>
                          </div>
                          <div className="text-sm font-medium bg-white px-3 py-1.5 rounded-lg border border-border shadow-sm">
                            / {price.unit}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
