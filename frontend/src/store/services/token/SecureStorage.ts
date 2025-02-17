import api from "../api";

class SecureStorage {
  private static instance: SecureStorage;

  private constructor(){
    // 최초 로드 시 memberId 값을 sessionStorage에서 값 가져오기
    this.syncMemberId();
    this.setupStorageListener();
  }

  public static getInstance(): SecureStorage {
    if(!SecureStorage.instance){
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  private async syncMemberId() {
    const storedMemberId = sessionStorage.getItem('memberId');
    if(!storedMemberId){
      // memberId가 없으면 서버에서 가지고 오기
      const id = await this.fetchMemberIdFromServer();
      this.setMemberId(id);
    }
  }

  async setMemberId(value: number | null) {
    if(value===null) value = Number(await this.fetchMemberIdFromServer());
    sessionStorage.setItem('memberId', value ? value.toString(): "");
  }

  getMemberId(): number | null {
    return Number(sessionStorage.getItem('memberId'));
  }

  removeId(): void{
    sessionStorage.removeItem('memberId')
  }

  // sessionStorage의 값 변조 감지
  // sessionStorage에 저장된 memberId 값이 변경된 것을 감지하면 서버에서 memberId 값을 새로 받아와서 저장함함
  private setupStorageListener(){
    window.addEventListener("storage", async (event) => {
      if(event.key === 'memberId'){
        // memberId의 값이 변조된 것을 감지하면 아래의 코드 실행
        const id = await this.fetchMemberIdFromServer();
        this.setMemberId(id);
      }
    })
  }

  private async fetchMemberIdFromServer(): Promise<number | null> {
    try{
      const response = await api.get<number | null>(`/member/id`);
      return response.data;
    }catch(error){
      console.log("id 로드 실패: ",error);
      return null;
    }
  }
}

export default SecureStorage.getInstance();