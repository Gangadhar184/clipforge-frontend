import { History } from 'lucide-react';

interface Props {
  jobs: string[];
  onSelect(jobId: string): void;
}

const JobHistory = ({ jobs, onSelect }: Props) => {
  if (!jobs.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
      </div>

      <div className="space-y-2">
        {jobs.slice(0, 5).map((id, index) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-gray-200 group-hover:bg-blue-200 rounded-full text-xs font-semibold text-gray-700 transition-colors duration-200">
                  {index + 1}
                </span>
                <span className="font-mono text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-200 truncate">
                  {id}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
                →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default JobHistory
