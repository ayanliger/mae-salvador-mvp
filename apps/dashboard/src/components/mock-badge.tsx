import { Badge } from "@/components/ui/badge";
import { FlaskConical } from "lucide-react";

/**
 * Inline badge to mark a single value or field as simulated (mock) data.
 */
export function MockBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="outline"
      className={`text-[10px] font-medium border-dashed border-amber-400 text-amber-600 bg-amber-50/60 gap-0.5 ${className ?? ""}`}
    >
      <FlaskConical className="w-2.5 h-2.5" />
      Simulado
    </Badge>
  );
}

/**
 * Wraps a section/tab whose data is entirely mock / demonstration.
 * Shows a subtle banner at the top and applies a faint visual indicator.
 */
export function MockSection({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg border border-dashed border-amber-300 bg-amber-50/50 text-amber-700">
        <FlaskConical className="w-3.5 h-3.5 shrink-0" />
        <p className="text-xs font-medium">
          {label ?? "Dados demonstrativos — integração pendente"}
        </p>
      </div>
      {children}
    </div>
  );
}
