import { useState } from "react";
import { RefreshCw, CheckCircle2, Loader2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { syncSyllabus } from "@/services/conceptService";
import { SyncResult } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function SyncPage() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const { toast } = useToast();

  const handleSync = async () => {
    setSyncing(true);
    setResult(null);
    try {
      const res = await syncSyllabus();
      setResult(res);
      toast({
        title: "Sync Complete",
        description: `${res.added} concept${res.added !== 1 ? "s" : ""} added${res.duplicates > 0 ? `, ${res.duplicates} duplicate${res.duplicates !== 1 ? "s" : ""} skipped` : ""}`,
      });
    } catch {
      toast({ title: "Sync Failed", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <AppLayout>
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Teacher Sync</h1>
        <p className="mt-1 text-muted-foreground">Preload syllabus content from your teacher's curated knowledge base</p>
      </div>

      <div className="mx-auto max-w-md animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="rounded-xl border border-border bg-card p-8 shadow-card text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary">
            {syncing ? <Loader2 className="h-9 w-9 text-primary-foreground animate-spin-slow" />
              : result ? <CheckCircle2 className="h-9 w-9 text-primary-foreground" />
              : <RefreshCw className="h-9 w-9 text-primary-foreground" />}
          </div>

          <h2 className="text-lg font-semibold text-foreground">
            {syncing ? "Syncing..." : result ? "Sync Complete" : "Load Syllabus"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {syncing ? "Fetching syllabus from teacher node..." : result ? `${result.added} new concept${result.added !== 1 ? "s" : ""} cached locally` : "Download the latest syllabus and cache it for offline access"}
          </p>

          {syncing && (
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-accent">
              <div className="h-full w-2/3 rounded-full gradient-primary animate-pulse-bar" />
            </div>
          )}

          {result && !syncing && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-success/10 p-3">
                <p className="text-2xl font-bold text-success">{result.added}</p>
                <p className="text-xs text-muted-foreground">Added</p>
              </div>
              <div className="rounded-lg bg-accent p-3">
                <p className="text-2xl font-bold text-foreground">{result.duplicates}</p>
                <p className="text-xs text-muted-foreground">Duplicates</p>
              </div>
            </div>
          )}

          <button onClick={handleSync} disabled={syncing}
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg gradient-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
            {syncing ? <><Loader2 className="h-4 w-4 animate-spin" />Syncing...</> : result ? "Sync Again" : "Load Syllabus"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
