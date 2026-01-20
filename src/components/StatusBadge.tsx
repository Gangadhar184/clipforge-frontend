import type { JobStatus } from "../services/types"
import { Clock, Loader2, Scissors, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  status: JobStatus
}

const StatusBadge = ({ status }: Props) => {
  const config = {
    PENDING: {
      colors: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
      dotColor: 'bg-yellow-500',
      icon: Clock,
    },
    DOWNLOADING: {
      colors: 'bg-blue-50 text-blue-700 border border-blue-200',
      dotColor: 'bg-blue-500',
      icon: Loader2,
    },
    CLIPPING: {
      colors: 'bg-purple-50 text-purple-700 border border-purple-200',
      dotColor: 'bg-purple-500',
      icon: Scissors,
    },
    COMPLETED: {
      colors: 'bg-green-50 text-green-700 border border-green-200',
      dotColor: 'bg-green-500',
      icon: CheckCircle2,
    },
    FAILED: {
      colors: 'bg-red-50 text-red-700 border border-red-200',
      dotColor: 'bg-red-500',
      icon: XCircle,
    },
  }[status];

  const Icon = config.icon;
  const isAnimated = status === 'DOWNLOADING' || status === 'CLIPPING';

  const statusLabel =
    status === 'DOWNLOADING'
      ? 'Downloading'
      : status === 'CLIPPING'
        ? 'Clipping'
        : status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full font-medium text-sm ${config.colors}`}>
      <span className={`w-2 h-2 rounded-full ${config.dotColor} ${isAnimated ? 'animate-pulse' : ''}`} />
      <Icon className={`w-4 h-4 ${isAnimated ? 'animate-spin' : ''}`} />
      <span>{statusLabel}</span>
    </div>
  )
}

export default StatusBadge
