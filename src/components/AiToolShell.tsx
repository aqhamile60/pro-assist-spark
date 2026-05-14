import { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

export function AiToolShell({ title, description, icon, children }: Props) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6 md:p-8">
      <header className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-md"
          style={{ background: "var(--gradient-primary)" }}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </header>
      {children}
      <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <p>
          <span className="font-medium text-foreground">Responsible AI:</span> Outputs are AI-generated and may contain
          inaccuracies or bias. Review carefully before using in professional contexts. Do not submit confidential data.
        </p>
      </div>
    </div>
  );
}
