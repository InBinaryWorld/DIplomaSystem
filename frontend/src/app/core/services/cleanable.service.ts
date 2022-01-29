import { Cleanable } from '../components/base/cleanable.directive';
import { ChangeDetectorRef } from '@angular/core';

export abstract class CleanableService {
  abstract init(cleanable: Cleanable, changeDetector: ChangeDetectorRef): void;
}
