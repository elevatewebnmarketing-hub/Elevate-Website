'use client';

export function Skeleton({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200/80 ${className}`}
      aria-hidden
    />
  );
}

export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-5 w-full max-w-[200px]" />
        </td>
      ))}
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 bg-white rounded-card shadow-soft border border-gray-100 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
}
