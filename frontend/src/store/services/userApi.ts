import api from "./api";

export const UserApi = {

  getUserInfo: async (memberId: number) => {
    // if(memberId === null) memberId = SecureStorage.getMemberId();
    try{
      const response = await api.get<User>(`/member/${memberId}`);
      return response.data;
    }catch(error){
      console.log('in user api: ', error);
      throw new Error('사용자 정보를 불러오는데 문제가 발생했습니다.')
    }
  },

  getUserFollower: async(memberId: number) => {
    // if(memberId === null ) memberId = SecureStorage.getMemberId();
    try{
      const response = await api.get<responseFollow>(`/follower/${memberId}`)
      return response.data;
    }catch(error){
      console.log('in user api-2: ', error)
      throw new Error('팔로워 정보를 불러오는데 문제가 발생했습니다.')
    }
  },

  getUserFollowing: async(memberId: number) => {
    // if(memberId === null ) memberId = SecureStorage.getMemberId();
    try{
      const response = await api.get<responseFollow>(`/following/${memberId}`)
      return response.data;
    }catch(error){
      console.log('in user api-2: ', error)
      throw new Error('팔로잉 정보를 불러오는데 문제가 발생했습니다.')
    }
  },

  deleteFollowing: async(memberId: number) => {
    try{
      const response = await api.delete<string>(`/follow/${memberId}`);
      return response.data;
    }catch(error){
      console.log('in user api-3:', error);
      throw new Error('언팔로우하는데 문제가 발생했습니다.')
    }
  },

  createFollowing: async(memberId: number) => {
    try{
      const response = await api.post<responseFollow>(`/follow/${memberId}`);
      return response.data;
    }catch(error){
      console.log('in user api-3:', error);
      throw new Error('팔로우하는데 문제가 발생했습니다.')
    }
  },

  getMultipleUserInfo: async (memberIds: number[]) => {
    try {
      const response = await api.post<User[]>('/member/basic', memberIds.map(id => ({ memberId: id })));
      return response.data;
    } catch(error) {
      console.log('in user api: ', error);
      throw new Error('여러 사용자 정보를 불러오는데 문제가 발생했습니다.')
    }
  }
}


