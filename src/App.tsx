import { useState } from 'react'
import ClipForm from './components/ClipForm';
import JobStatusCard from './components/JobStatusCard';
import JobHistory from './components/JobHistory';
import { Zap } from 'lucide-react';

const App = () => {
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleJobCreated = (jobId: string) => {
    setCurrentJobId(jobId);
    setHistory((prev) => [jobId, ...prev]);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
  
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ClipForge</h1>
              <p className="text-xs text-gray-600">Tweet to Video Clips</p>
            </div>
          </div>
        </div>
      </header>

  
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Create New Clip</h2>
                <p className="text-gray-600 text-sm mt-1">Paste a tweet URL and specify the time range for your clip</p>
              </div>
              <ClipForm onJobCreated={handleJobCreated} />
            </div>
            {currentJobId && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Processing Status</h2>
                <JobStatusCard jobId={currentJobId} />
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <JobHistory jobs={history} onSelect={setCurrentJobId} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
