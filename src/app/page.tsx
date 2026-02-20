"use client";

import Image from "next/image";
import { useSentinel } from "@/hooks/use-sentinel";
import { PermissionsView } from "@/components/sentinel/permissions-view";
import { EnforcementView } from "@/components/sentinel/enforcement-view";
import { IdleView } from "@/components/sentinel/idle-view";
import { Loader2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const {
    isClient,
    permissionsGranted,
    enforcementActive,
    lastPushupTime,
    isUpdating,
    handlePermissionsClick,
    handleDidItClick,
    currentPushupType,
  } = useSentinel();

  const backgroundImage = PlaceHolderImages.find(img => img.id === 'gym-background');

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
      return <EnforcementView onConfirm={handleDidItClick} isUpdating={isUpdating} pushupType={currentPushupType} />;
    }
    return <IdleView lastPushupTime={lastPushupTime} />;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 text-center font-body">
      {backgroundImage && (
        <Image
          src={backgroundImage.imageUrl}
          alt={backgroundImage.description}
          fill
          className="object-cover"
          data-ai-hint={backgroundImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10">
        {renderContent()}
      </div>
      <footer className="absolute bottom-4 left-0 right-0 z-20 text-center text-sm text-white/50">
        <p>Developed by Hundaol Fekadu.</p>
        <a href="https://t.me/HundaolFekadu" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          t.me/HundaolFekadu
        </a>
      </footer>
    </main>
  );
}
