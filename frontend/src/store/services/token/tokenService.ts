// services/token/tokenService.ts
class TokenService {
  private static instance: TokenService;
  // private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    // console.log(TokenService.instance)
    return TokenService.instance;
  }

  setAccessToken(token: string): void {
    // this.accessToken = token;
    sessionStorage.setItem('accessToken', token);
  }

  getAccessToken(): string | null {
    // return this.accessToken;
    return sessionStorage.getItem('accessToken');
  }

  removeAccessToken(): void {
    // this.accessToken = null;
    sessionStorage.removeItem('accessToken');
  }

  isAuthenticated(): boolean {
    // return !!this.accessToken;
    return !!sessionStorage.getItem('accessToken');
  }
}

export default TokenService.getInstance();
