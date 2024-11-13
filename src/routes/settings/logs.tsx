import UnderConstruction from '@/components/under-construction'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/logs')({
  component: () => <UnderConstruction />,
})
