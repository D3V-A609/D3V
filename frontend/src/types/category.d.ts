// types/category.d.ts
declare type JobCategory = {
    id: number;
    name: string;
    skills: string[];
  };


// 나중에 API 가져오면 쓰려고 잠깐 주석 처리(서비스 함수)
// // services/jobCategoryService.ts
// import axios from 'axios';

// export const jobCategoryService = {
//   getJobCategories: async (): Promise<JobCategory[]> => {
//     const response = await axios.get('/api/job-categories');
//     return response.data;
//   }
// };
