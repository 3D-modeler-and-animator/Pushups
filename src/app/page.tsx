"use client";

import { useSentinel } from "@/hooks/use-sentinel";
import { PermissionsView } from "@/components/sentinel/permissions-view";
import { EnforcementView } from "@/components/sentinel/enforcement-view";
import { IdleView } from "@/components/sentinel/idle-view";
import { Loader2 } from "lucide-react";

export default function Home() {
  const {
    isClient,
    permissionsGranted,
    enforcementActive,
    lastPushupTime,
    isUpdating,
    handlePermissionsClick,
    handleDidItClick,
  } = useSentinel();

  const renderContent = () => {
    if (!isClient) {
      return (
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h1 className="text-2xl font-bold">Initializing Sentinel...</h1>
        </div>
      );
    }
    if (!permissionsGranted) {
      return <PermissionsView onActivate={handlePermissionsClick} />;
    }
    if (enforcementActive) {
      return <EnforcementView onConfirm={handleDidItClick} isUpdating={isUpdating} />;
    }
    return <IdleView lastPushupTime={lastPushupTime} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center font-body">
      {renderContent()}
    </main>
  );
}
