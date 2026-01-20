import type { CreateClipRequest, CreateClipResponse, JobStatusResponse } from "./types";

const BACKEND_URL = 'http://localhost:8080';

export const createClipJob = async (payload: CreateClipRequest): Promise<CreateClipResponse> => {

    const response = await fetch(`${BACKEND_URL}/clip`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(payload)
    })
    if(!response.ok) {
        throw new Error("failed to create clip job");
    }
    return response.json();

}

export const getJobStatus = async(jobId: string): Promise<JobStatusResponse> => {
    const response = await fetch(`${BACKEND_URL}/status/${jobId}`);

    if(!response.ok) {
        throw new Error("failed to fetch job status");
    }

    return response.json();

}