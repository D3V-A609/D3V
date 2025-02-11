type Job = string;

interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}
