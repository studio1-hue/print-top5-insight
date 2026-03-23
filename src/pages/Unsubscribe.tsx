import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BarChart3, CheckCircle2, XCircle, Loader2 } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: anonKey },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.valid === false && d.reason === "already_unsubscribed") setStatus("already");
        else if (d.valid) setStatus("valid");
        else setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleUnsubscribe = async () => {
    setStatus("loading");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) throw error;
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">PrintPartner</h1>

        {status === "loading" && <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />}
        {status === "valid" && (
          <>
            <p className="text-muted-foreground">Czy na pewno chcesz zrezygnować z otrzymywania wiadomości?</p>
            <Button onClick={handleUnsubscribe} variant="destructive">Potwierdź rezygnację</Button>
          </>
        )}
        {status === "success" && (
          <div className="space-y-2">
            <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
            <p className="text-foreground font-medium">Wypisano pomyślnie</p>
            <p className="text-muted-foreground text-sm">Nie będziesz już otrzymywać od nas wiadomości.</p>
          </div>
        )}
        {status === "already" && (
          <div className="space-y-2">
            <CheckCircle2 className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="text-foreground font-medium">Już wypisano</p>
            <p className="text-muted-foreground text-sm">Ten adres e-mail został już wcześniej wypisany.</p>
          </div>
        )}
        {status === "invalid" && (
          <div className="space-y-2">
            <XCircle className="mx-auto h-10 w-10 text-destructive" />
            <p className="text-foreground font-medium">Nieprawidłowy link</p>
            <p className="text-muted-foreground text-sm">Link do rezygnacji jest nieprawidłowy lub wygasł.</p>
          </div>
        )}
        {status === "error" && (
          <div className="space-y-2">
            <XCircle className="mx-auto h-10 w-10 text-destructive" />
            <p className="text-foreground font-medium">Wystąpił błąd</p>
            <p className="text-muted-foreground text-sm">Spróbuj ponownie później.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
