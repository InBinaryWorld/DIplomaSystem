import { ChangeDetectorRef, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppLanguage } from '../models/app-language.model';
import { CleanableService } from './cleanable.service';
import { Dictionary } from '../models/dictionary.model';
import { Cleanable } from '../components/base/cleanable.directive';
import { SessionStoreService } from '../../base/services/session-store.service';
import { SettingsService } from './settings.service';
import { isNotNil } from '../tools/is-not-nil';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService extends CleanableService {

  private localesByLang: Dictionary<string> = {
    [AppLanguage.POLISH]: 'pl',
    [AppLanguage.ENGLISH]: 'en-US'
  };

  constructor(private readonly settingsService: SettingsService,
              private readonly translateService: TranslateService,
              private readonly sessionStoreService: SessionStoreService) {
    super();
  }

  get defaultLanguage(): AppLanguage {
    return this.settingsService.getDefaultLanguage();
  }

  public init(cleanable: Cleanable, changeDetector: ChangeDetectorRef): void {
    this.translateService.setDefaultLang(this.defaultLanguage);
    cleanable.addSubscription(
      this.sessionStoreService.getLanguage().subscribe(language => {
        const lang = isNotNil(language) ? language : this.defaultLanguage;
        this.translateService.use(lang as AppLanguage);
        changeDetector.markForCheck();
      })
    );
  }

  public getCurrentLanguage(): AppLanguage {
    return this.translateService.currentLang as AppLanguage;
  }

  public getLocale(): string {
    return this.localesByLang[this.translateService.currentLang];
  }

}
