import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppTranslateService } from "../../../core/services/app-translate.service";
import { spinnerName } from "../../../core/services/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  spinnerName = spinnerName;

  constructor(private readonly translationsService: AppTranslateService) {
  }

  ngOnInit(): void {
    this.initServices();
  }

  protected initServices(): void {
    this.translationsService.init();
  }

}
