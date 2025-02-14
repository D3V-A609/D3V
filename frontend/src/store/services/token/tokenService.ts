// services/token/tokenService.ts
class TokenService {
  private static instance: TokenService;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    // console.log(TokenService.instance)
    return TokenService.instance;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  removeAccessToken(): void {
    this.accessToken = null;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}

export default TokenService.getInstance();
