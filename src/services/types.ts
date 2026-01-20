export type JobStatus =
  | 'PENDING'
  | 'DOWNLOADING'
  | 'CLIPPING'
  | 'COMPLETED'
  | 'FAILED';

  export interface CreateClipRequest {
  tweetUrl: string;
  start?: string;
  end?: string;
}


  export interface CreateClipResponse {
    jobId: string;
  }

  export interface JobStatusResponse {
  jobId: string;
  status: JobStatus;
  progress?: string;
  errorMessage?: string;
  downloadUrl?: string;
  createdAt: string;
  updatedAt: string;
}