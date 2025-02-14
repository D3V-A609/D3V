// // src/workers/tokenWorker.ts
// let tokens = {
//   accessToken: null,
//   refreshToken: null
// };

// self.addEventListener('message', (e: MessageEvent) => {
//   const { type, payload } = e.data;
  
//   switch (type) {
//     case 'SET_TOKENS':
//       tokens = {
//         accessToken: payload.accessToken,
//         refreshToken: payload.refreshToken
//       };
//       self.postMessage({ type: 'TOKENS_SET', success: true });
//       break;
      
//     case 'GET_ACCESS_TOKEN':
//       self.postMessage({ 
//         type: 'ACCESS_TOKEN', 
//         token: tokens.accessToken 
//       });
//       break;
      
//     case 'GET_REFRESH_TOKEN':
//       self.postMessage({ 
//         type: 'REFRESH_TOKEN', 
//         token: tokens.refreshToken 
//       });
//       break;
      
//     case 'CLEAR_TOKENS':
//       tokens = {
//         accessToken: null,
//         refreshToken: null
//       };
//       self.postMessage({ type: 'TOKENS_CLEARED' });
//       break;
//   }
// });
