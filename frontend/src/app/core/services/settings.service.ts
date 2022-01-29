import { Injectable } from '@angular/core';
import { finalEnvironment } from '../../../environments/final-enviroment';
import { ApiLabel } from '../models/api-route.model';
import { AppLanguage } from '../models/app-language.model';


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

  getServerApi(apiLabel: ApiLabel): string {
    return this.serverConfig.api[apiLabel];
  }

  getDefaultLanguage(): AppLanguage {
    return this.environments.defaultLanguage;
  }

  isFakeApiModeOn(): boolean {
    return this.environments.fakeApi;
  }

  isProduction(): boolean {
    return this.environments.production;
  }

}
