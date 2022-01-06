import {ChangeDetectorRef, Injectable} from "@angular/core";
import {Dictionary} from "../models/dictionary.model";
import {NgxSpinnerService} from "ngx-spinner";

export const spinnerName = 'spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private openSpinnersByName: Dictionary<number> = {};

  constructor(private readonly spinnerService: NgxSpinnerService) {
  }

  public act(isShowing: boolean, changeDetector?: ChangeDetectorRef, name: string = spinnerName): void {
    if (isShowing) {
      this.show(changeDetector, name);
    } else {
      this.hide(changeDetector, name);
    }
  }

  public show(changeDetector?: ChangeDetectorRef, name: string = spinnerName): void {
    const openedCount = this.getOpenedSpinnersCount(name);
    if (openedCount === 0) {
      this.spinnerService.show(name).then(() => this.markForCheck(changeDetector))
    }
    this.changeOpenedSpinnersCount(1, name)
  }

  public hide(changeDetector?: ChangeDetectorRef, name: string = spinnerName): void {
    const openedCount = this.getOpenedSpinnersCount(name);
    if (openedCount === 1) {
      this.spinnerService.hide(name).then(() => this.markForCheck(changeDetector))
    }
    this.changeOpenedSpinnersCount(-1, name)
  }

  private getOpenedSpinnersCount(name: string = spinnerName): number {
    return this.openSpinnersByName[name] ?? 0;
  }

  private changeOpenedSpinnersCount(change: number, name: string = spinnerName): void {
    const currentCount = this.getOpenedSpinnersCount(name);
    const sum = change + currentCount;
    this.openSpinnersByName[name] = sum < 0 ? 0 : sum;
  }

  private markForCheck(changeDetector?: ChangeDetectorRef): void {
    changeDetector?.markForCheck();
  }

}
