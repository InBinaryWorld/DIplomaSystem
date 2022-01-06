import { Injectable } from '@angular/core';
import { finalEnvironment } from '../../../environments/final-enviroment';
import { ApiName } from "../models/api-route.model";


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private get environments(): typeof finalEnvironment {
    return finalEnvironment;
  }

  get serverConfig(): typeof finalEnvironment.serverConfig {
    return this.environments.serverConfig;
  }

  get serverBaseUrl(): string {
    return this.serverConfig.baseUrl;
  }

  getServerApi(apiName: ApiName): string {
    return this.serverConfig.api[apiName];
  }

  isProduction(): boolean {
    return this.environments.production;
  }

}
