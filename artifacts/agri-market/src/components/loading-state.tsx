import { Sprout } from "lucide-react";
import { motion } from "framer-motion";

export function LoadingState({ message = "Chargement..." }: { message?: string }) {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-6 p-8">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-xl shadow-primary/30 relative z-10"
        >
          <Sprout className="w-8 h-8" />
        </motion.div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-bold text-foreground animate-pulse">{message}</h3>
        <p className="text-sm text-muted-foreground font-arabic opacity-70">جاري التحميل...</p>
      </div>
    </div>
  );
}

export function ErrorState({ error, retry }: { error?: Error | null, retry?: () => void }) {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-4 p-8 text-center bg-destructive/5 rounded-3xl border border-destructive/10">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-2">
        <Sprout className="w-8 h-8 opacity-50 grayscale" />
      </div>
      <h3 className="text-xl font-bold text-foreground">Une erreur est survenue</h3>
      <p className="text-muted-foreground max-w-md">
        {error?.message || "Impossible de charger les données. Veuillez vérifier votre connexion."}
      </p>
      {retry && (
        <button 
          onClick={retry}
          className="mt-4 px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, description, icon: Icon = Sprout }: { title: string, description: string, icon?: any }) {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-muted-foreground/50 mb-6">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm">{description}</p>
    </div>
  );
}
