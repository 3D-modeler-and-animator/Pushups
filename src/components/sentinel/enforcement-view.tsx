import { Button } from "@/components/ui/button";

type EnforcementViewProps = {
  onConfirm: () => void;
  isUpdating: boolean;
  pushupType: string;
};

export function EnforcementView({ onConfirm, isUpdating, pushupType }: EnforcementViewProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="animate-pulse font-headline text-5xl font-black uppercase text-primary md:text-7xl">
        Stop working.
        <br />
        Do twenty {pushupType}s now.
      </h1>
      <Button
        onClick={onConfirm}
        disabled={isUpdating}
        size="lg"
        className="h-20 w-64 bg-accent text-3xl font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-transform hover:scale-105 hover:bg-accent/90"
      >
        {isUpdating ? "UPDATING..." : "I DID IT!"}
      </Button>
    </div>
  );
}
