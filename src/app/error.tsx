'use client'
import ErrorPage from '@/page-modules/error'
export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorPage reset={reset} />
}
