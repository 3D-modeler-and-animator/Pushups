import { Timestamp } from "firebase/firestore";
import { formatDistanceToNow } from 'date-fns';

type IdleViewProps = {
  lastPushupTime: Timestamp | null;
};

export function IdleView({ lastPushupTime }: IdleViewProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-headline text-5xl font-black text-foreground">
        All Clear.
      </h1>
      <p className="text-2xl text-muted-foreground">Get back to work.</p>
      {lastPushupTime && (
        <p className="mt-8 text-lg text-accent">
          Last set completed: {formatDistanceToNow(lastPushupTime.toDate(), { addSuffix: true })}.
        </p>
      )}
    </div>
  );
}
