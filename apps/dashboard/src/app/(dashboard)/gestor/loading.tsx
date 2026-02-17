import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function GestorLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-72 mt-2" />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="w-10 h-10 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts area */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4 px-5 space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 px-5 space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
