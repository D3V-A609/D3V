// store/services/jobApi.ts
import api from './api';

export const jobApi = {
  // 전체 직무 목록 조회
  getJobs: async () => {
    return await api.get<JobType[]>('/job');
  },

  // 선택된 직무에 따른 기술 목록 조회
  getSkillsByJobs: async (selectedJobs: JobType[]) => {
    return await api.post<SkillType[]>('/job/skills', selectedJobs);
  },
};

export default jobApi;
