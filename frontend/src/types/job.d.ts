type JobType = string;
type SkillType = string;

interface JobState {
  jobs: JobType[];
  selectedJobs: JobType[];
  skills: SkillType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  error: string | null;
}

// API 요청/응답 타입
interface JobResponse {
  jobs: JobType[];
}

interface SkillResponse {
  skills: SkillType[];
}
