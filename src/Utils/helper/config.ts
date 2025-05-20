interface Config {
  baseUrl: string;
}
const checkConfig = (server: string): Config | object => {
  let config: Config | {} = {};
  switch (server) {
    case 'production':
      config = {
        baseUrl: 'https://hire-with-tess-frontend-mf6h.vercel.app',
      };
      break;
    case 'local':
      config = {
        baseUrl: 'http://localhost:3000',
      };
      break;
    default:
      break;
  }
  return config;
};

export const selectServer = 'production';
export const config = checkConfig(selectServer) as Config;
