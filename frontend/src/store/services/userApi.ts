import api from "./api";
import SecureStorage from "./token/SecureStorage";

export const UserApi = {

  getUserInfo: async (memberId: number | null) => {
    if(memberId === null) memberId = SecureStorage.getMemberId();
    try{
      const response = await api.get<User>(`/member/${memberId}`);
      return response.data;
    }catch(error){
      console.log('in user api: ', error);
      return new Error('사용자 정보를 불러오는데 문제가 발생했습니다.')
    }
  },

  getMultipleUserInfo: async (memberIds: number[]) => {
    try {
      const response = await api.post<User[]>('/member/basic', memberIds.map(id => ({ memberId: id })));
      return response.data;
    } catch(error) {
      console.log('in user api: ', error);
      return new Error('여러 사용자 정보를 불러오는데 문제가 발생했습니다.')
    }
  }
}


