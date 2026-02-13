import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PermissionsViewProps = {
  onActivate: () => void;
};

export function PermissionsView({ onActivate }: PermissionsViewProps) {
  return (
    <Card className="w-full max-w-md border-primary shadow-lg shadow-primary/20">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">Push Up Sentinel</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <p className="text-lg text-muted-foreground">
          This app requires permissions to play audio and speak to you.
        </p>
        <Button onClick={onActivate} size="lg" className="w-full text-xl font-bold">
          Activate Sentinel
        </Button>
      </CardContent>
    </Card>
  );
}
