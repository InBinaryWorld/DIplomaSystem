import {ChangeDetectorRef, Directive} from "@angular/core";
import {Cleanable} from "../../directives/cleanable.directive";

@Directive()
export abstract class BaseComponent extends Cleanable {
  protected constructor(protected readonly changeDetector: ChangeDetectorRef) {
    super();
  }

  protected markForCheck(): void {
    this.changeDetector.markForCheck();
  }

  protected detectChanges(): void {
    this.changeDetector.detectChanges();
  }

}
