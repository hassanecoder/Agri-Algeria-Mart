import { useState } from "react";
import { useSendMessage } from "@workspace/api-client-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactDialog({ 
  open, 
  onOpenChange, 
  sellerId, 
  productName 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  sellerId?: string;
  productName?: string;
}) {
  const { toast } = useToast();
  const sendMessage = useSendMessage();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    subject: productName ? `Demande d'information: ${productName}` : "",
    body: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage.mutate({ data: { ...formData, recipientSellerId: sellerId } }, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => {
          onOpenChange(false);
          setSuccess(false);
          setFormData(prev => ({...prev, body: ""})); // reset body but keep contact info
        }, 2000);
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer le message. Veuillez réessayer.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border/50">
        <div className="h-2 bg-gradient-to-r from-primary to-accent" />
        
        {success ? (
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
            <p className="text-muted-foreground">Le vendeur a été notifié et vous répondra très prochainement.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl">Contacter le vendeur</DialogTitle>
              <DialogDescription>
                Remplissez ce formulaire pour envoyer une demande directe au vendeur.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom complet *</Label>
                  <Input 
                    required 
                    value={formData.senderName} 
                    onChange={e => setFormData({...formData, senderName: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input 
                    type="tel" 
                    value={formData.senderPhone} 
                    onChange={e => setFormData({...formData, senderPhone: e.target.value})} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input 
                  required 
                  type="email" 
                  value={formData.senderEmail} 
                  onChange={e => setFormData({...formData, senderEmail: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Sujet *</Label>
                <Input 
                  required 
                  value={formData.subject} 
                  onChange={e => setFormData({...formData, subject: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Message *</Label>
                <Textarea 
                  required 
                  rows={4}
                  placeholder="Bonjour, je suis intéressé par vos produits..."
                  value={formData.body} 
                  onChange={e => setFormData({...formData, body: e.target.value})} 
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={sendMessage.isPending} className="gap-2 shadow-md">
                {sendMessage.isPending ? "Envoi..." : "Envoyer le message"} 
                {!sendMessage.isPending && <Send className="w-4 h-4" />}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
