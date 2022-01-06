import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AppTranslateService} from "../../../core/services/app-translate.service";
import {AppLanguage} from "../../../core/models/app-language.model";
import {FormControl} from "@angular/forms";
import {BaseComponent} from "../../../core/components/base/base-component.directive";
import {SpinnerService} from "../../../core/services/spinner.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent extends BaseComponent implements OnInit {
  AppLanguage = AppLanguage;
  languageControl = new FormControl();

  constructor(private readonly translateService: AppTranslateService,
              private readonly spinnerService: SpinnerService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  ngOnInit(): void {
    this.initLanguage();
  }

  private initLanguage() {
    const lang = this.translateService.getCurrentLanguage();
    this.languageControl.setValue(lang);
    this.markForCheck();
    this.addSubscription(
      this.languageControl.valueChanges.subscribe(
        lang => this.translateService.useLanguage(lang)
      )
    );
  }

}
