import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { AppLanguage } from "../models/app-language.model";
import { CleanableService } from "./cleanable.service";
import { Dictionary } from "../models/dictionary.model";

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService extends CleanableService {

  private localesByLang: Dictionary<string> = {
    [AppLanguage.POLISH]: 'pl',
    [AppLanguage.ENGLISH]: 'en-US',
  }


  constructor(private readonly translateService: TranslateService) {
    super();
  }

  public init(): void {
    this.translateService.setDefaultLang(AppLanguage.POLISH);
    this.translateService.use(AppLanguage.POLISH); //--> I didn't had this line before
  }

  public useLanguage(lang: AppLanguage): Observable<any> {
    return this.translateService.use(lang);
  }

  public getCurrentLanguage(): AppLanguage {
    return this.translateService.currentLang as AppLanguage;
  }

  public getLocale(): string {
    return this.localesByLang[this.translateService.currentLang];
  }

}
