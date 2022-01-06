import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {AppLanguage} from "../models/app-language.model";

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService {

  constructor(private readonly translateService: TranslateService) {
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

}
