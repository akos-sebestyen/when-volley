// Skeleton Loader component
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TeamPageSkeletonLoader() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl">
      {/* Skeleton for the Title */}
      <Skeleton className="h-8 w-48 mb-4 mx-auto" />

      {/* Skeleton for the Cards */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-5 w-56 mt-2" />
          <Skeleton className="h-5 w-48 mt-2" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-32" />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-5 space-y-3">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-5 w-56 mt-2" />
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
