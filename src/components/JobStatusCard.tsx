
import { useJobStatus } from '../hooks/useJobStatus'
import { AlertCircle, Download, Loader2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface Props {
  jobId: string
}

const JobStatusCard = ({ jobId }: Props) => {
  const { data, isLoading, error } = useJobStatus(jobId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-3" />
          <p className="text-gray-600 font-medium">Loading job status...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-red-900 font-semibold">Failed to load</p>
          <p className="text-red-700 text-sm mt-1">Unable to fetch job status. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Job Status</h3>
        <StatusBadge status={data.status} />
      </div>

      {data.downloadUrl && data.status === 'COMPLETED' && (
        <a
          href={data.downloadUrl}
          download
          className="inline-flex items-center gap-2 bg-linear-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Download className="w-4 h-4" />
          Download Result
        </a>
      )}
    </div>
  )
}

export default JobStatusCard
