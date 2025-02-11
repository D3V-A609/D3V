import api from './api';

export const jobApi = {
  getJobs: () => api.get<string[]>('/job')
};
