import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PainelLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-40 mt-2" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-full sm:w-[180px]" />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-3">
              {[160, 100, 100, 60, 60, 80, 60, 140, 100].map((w, i) => (
                <Skeleton key={i} className="h-4" style={{ width: w }} />
              ))}
            </div>
            {/* Rows */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3">
                <Skeleton className="h-4 w-[160px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-5 w-[60px] rounded-full" />
                <Skeleton className="h-4 w-[140px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
