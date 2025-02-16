// store/services/jobApi.ts
import api from './api';

export const jobApi = {
  // 전체 직무 목록 조회
  getJobs: async () => {
    try{
      return await api.get<JobType[]>('/job');
    }catch(error){
      console.log('in job api error-1: ', error);
      throw new Error('전체 직무의 목록의 불러오는데 문제가 발생했습니다.')
    }
  },

  // 선택된 직무에 따른 기술 목록 조회
  getSkillsByJobs: async (selectedJobs: JobType[]) => {
    try{
      return await api.post<SkillType[]>('/job/skills', selectedJobs);
    }catch(error){
      console.log('in job api error-2: ', error)
      throw new Error('직무의 기술 목록을 불러오는데 문제가 발생했습니다.');
    }
  },
};

export default jobApi;
