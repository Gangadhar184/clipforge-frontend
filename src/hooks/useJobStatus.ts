import { useQuery } from '@tanstack/react-query';
import type { JobStatusResponse } from '../services/types';
import { getJobStatus } from '../services/api';

export const useJobStatus = (jobId?: string) => {
  return useQuery({
    queryKey: ['jobStatus', jobId],
    queryFn: (): Promise<JobStatusResponse> => getJobStatus(jobId!),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const data = query.state.data as JobStatusResponse | undefined;
      if (!data) return 2000;
      return data.status === 'COMPLETED' || data.status === 'FAILED'
        ? false
        : 2000;
    },
  });
};
