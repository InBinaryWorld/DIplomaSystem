import { ChangeDetectorRef, Directive } from '@angular/core';
import { Role } from 'src/app/base/models/dto/role.model';
import { LabelBuilder } from 'src/app/base/utils/label-builder.utils';
import { TranslationKeys } from 'src/app/base/utils/translation-keys.utils';
import { Cleanable } from './cleanable.directive';

@Directive()
export abstract class BaseComponent extends Cleanable {

  Role = Role;
  LabelBuilder = LabelBuilder;
  TranslationKeys = TranslationKeys;

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
