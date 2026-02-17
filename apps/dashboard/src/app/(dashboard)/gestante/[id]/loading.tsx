import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function GestanteDetailLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Skeleton className="w-5 h-5 mt-1" />
        <div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-48 mt-2" />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-4 pb-3 px-4 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs placeholder */}
      <div className="space-y-4">
        <div className="flex gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-md" />
          ))}
        </div>
        <Card>
          <CardContent className="p-4 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[50px]" />
                <Skeleton className="h-5 w-[70px] rounded-full" />
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
