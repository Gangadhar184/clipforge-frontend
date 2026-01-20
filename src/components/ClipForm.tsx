import { useMutation } from '@tanstack/react-query';
import { useState } from 'react'
import { createClipJob } from '../services/api';
import type { CreateClipRequest } from '../services/types';
import { Loader2, Play } from 'lucide-react';

interface Props {
  onJobCreated(jobId: string): void;
}

const ClipForm = ({ onJobCreated }: Props) => {
  const [tweetUrl, setTweetUrl] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const mutation = useMutation({
    mutationFn: (payload: CreateClipRequest) => createClipJob(payload),
    onSuccess: (data) => {
      onJobCreated(data.jobId);
      setTweetUrl('');
      setStart('');
      setEnd('');
    },
  });

  const isLoading = mutation.isPending;
  const isDisabled = !tweetUrl || isLoading;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="tweetUrl" className="block text-sm font-semibold text-gray-900 mb-2">
            Tweet URL
          </label>
          <input
            id="tweetUrl"
            type="url"
            placeholder="https://twitter.com/..."
            value={tweetUrl}
            onChange={(e) => setTweetUrl(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start" className="block text-sm font-semibold text-gray-900 mb-2">
              Start Time (s)
            </label>
            <input
              id="start"
              type="number"
              placeholder="0"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="end" className="block text-sm font-semibold text-gray-900 mb-2">
              End Time (s)
            </label>
            <input
              id="end"
              type="number"
              placeholder="60"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
            />
          </div>
        </div>

        {mutation.isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm font-medium">Failed to create clip. Please try again.</p>
          </div>
        )}
      </div>

      <button
        onClick={() =>
          mutation.mutate({ tweetUrl, start: start || undefined, end: end || undefined })
        }
        disabled={isDisabled}
        className="w-full mt-6 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Create Clip
          </>
        )}
      </button>
    </div>
  )
}

export default ClipForm
