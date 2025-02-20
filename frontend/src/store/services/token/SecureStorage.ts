import api from "../api";

class SecureStorage {

  private static instance: SecureStorage;
  private isAuthenticated: boolean = false; // ✅ isAuthenticated 상태 추가

  private constructor(){
    // 최초 로드 시 memberId 값을 sessionStorage에서 값 가져오기
    if(this.isAuthenticated){
      this.syncMemberId();
    }
    this.setupStorageListener();
  }

  public static getInstance(): SecureStorage {
    if(!SecureStorage.instance){
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  // ✅ isAuthenticated 상태를 업데이트하는 메서드 추가
  public updateAuthStatus(isAuth: boolean) {
    this.isAuthenticated = isAuth;
    if (isAuth) {
      this.syncMemberId(); // ✅ 로그인 상태일 때만 memberId 동기화 실행
    }
  }

  private async syncMemberId() {
    if (!this.isAuthenticated) return; // ✅ 인증되지 않으면 API 호출 X

    const storedMemberId = this.getMemberId(); // ✅ sessionStorage에서 먼저 확인
    if (storedMemberId) return; // ✅ 이미 저장되어 있으면 API 호출 X
    
    if(!storedMemberId){
      // memberId가 없으면 서버에서 가지고 오기
      const id = await this.fetchMemberIdFromServer();
      this.setMemberId(id);
    }
  }

  async setMemberId(value: number | null) {
    if (!this.isAuthenticated) return; // ✅ 인증되지 않으면 저장 X
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
    if (!this.isAuthenticated) return null; // ✅ 로그인 상태가 아닐 때 API 호출 X
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