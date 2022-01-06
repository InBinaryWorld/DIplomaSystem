import { ApiName } from "../app/core/models/api-route.model";

export const baseEnvironment = {
  serverConfig: {
    baseUrl: 'http://localhost:8082',
    api: {
      [ApiName.LOGIN]: '/auth/authenticate'
    }
  }
};
