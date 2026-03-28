import { useState } from "react";
import { Layout } from "@/components/layout";
import { useSendMessage } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const sendMessage = useSendMessage();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    subject: "",
    body: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage.mutate({ data: formData }, {
      onSuccess: () => {
        setSuccess(true);
        setFormData({ senderName: "", senderEmail: "", senderPhone: "", subject: "", body: "" });
        setTimeout(() => setSuccess(false), 5000);
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite. Veuillez réessayer plus tard.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Layout>
      <div className="bg-primary/5 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] bg-repeat" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-muted-foreground">
            Notre équipe est là pour vous aider. Que vous soyez un agriculteur ou un acheteur, nous répondrons à toutes vos questions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Adresse</h3>
                    <p className="text-muted-foreground">123 Rue de l'Agriculture<br />Alger Centre, Algérie</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Téléphone</h3>
                    <p className="text-muted-foreground" dir="ltr">+213 (0) 555 12 34 56<br />Lun-Jeu, 08:00 - 17:00</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">contact@fellahmarket.dz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-card rounded-3xl p-8 border border-border shadow-xl shadow-black/5">
              {success ? (
                <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Message envoyé avec succès !</h3>
                  <p className="text-lg text-muted-foreground max-w-md">
                    Nous avons bien reçu votre message. Notre équipe vous contactera dans les plus brefs délais.
                  </p>
                  <Button variant="outline" className="mt-8" onClick={() => setSuccess(false)}>
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Nom complet *</Label>
                      <Input 
                        required 
                        placeholder="Votre nom"
                        className="bg-secondary/30 py-6"
                        value={formData.senderName} 
                        onChange={e => setFormData({...formData, senderName: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      <Input 
                        type="tel" 
                        placeholder="0555..."
                        className="bg-secondary/30 py-6"
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
                      placeholder="votre@email.com"
                      className="bg-secondary/30 py-6"
                      value={formData.senderEmail} 
                      onChange={e => setFormData({...formData, senderEmail: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sujet *</Label>
                    <Input 
                      required 
                      placeholder="Comment pouvons-nous vous aider ?"
                      className="bg-secondary/30 py-6"
                      value={formData.subject} 
                      onChange={e => setFormData({...formData, subject: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Message *</Label>
                    <Textarea 
                      required 
                      rows={6}
                      placeholder="Votre message détaillé ici..."
                      className="bg-secondary/30 resize-none"
                      value={formData.body} 
                      onChange={e => setFormData({...formData, body: e.target.value})} 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={sendMessage.isPending} 
                    className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/20"
                  >
                    {sendMessage.isPending ? "Envoi en cours..." : "Envoyer le message"} 
                    {!sendMessage.isPending && <Send className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
