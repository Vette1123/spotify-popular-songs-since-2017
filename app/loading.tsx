import { SkeletonCard } from '@/components/skeleton-card'

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <SkeletonCard key={i} isLoading={true} />
        ))}
      </div>
    </div>
  )
}
