// // src/services/token/tokenWorkerService.ts
// export class TokenWorkerService {
//   private worker: Worker;

//   constructor() {
//     this.worker = new Worker(
//       new URL('../../workers/tokenWorker.ts', import.meta.url),
//       { type: 'module' }
//     );
//   }

//   async setTokens(accessToken: string, refreshToken: string): Promise<void> {
//     return new Promise((resolve) => {
//       this.worker.postMessage({
//         type: 'SET_TOKENS',
//         payload: { accessToken, refreshToken }
//       });

//       this.worker.onmessage = (e) => {
//         if (e.data.type === 'TOKENS_SET') {
//           resolve();
//         }
//       };
//     });
//   }

//   async getAccessToken(): Promise<string | null> {
//     return new Promise((resolve) => {
//       this.worker.postMessage({ type: 'GET_ACCESS_TOKEN' });

//       this.worker.onmessage = (e) => {
//         if (e.data.type === 'ACCESS_TOKEN') {
//           resolve(e.data.token);
//         }
//       };
//     });
//   }

//   async clearTokens(): Promise<void> {
//     return new Promise((resolve) => {
//       this.worker.postMessage({ type: 'CLEAR_TOKENS' });
// // 
//       this.worker.onmessage = (e) => {
//         if (e.data.type === 'TOKENS_CLEARED') {
//           resolve();
//         }
//       };
//     });
//   }
// }

// export default new TokenWorkerService();
