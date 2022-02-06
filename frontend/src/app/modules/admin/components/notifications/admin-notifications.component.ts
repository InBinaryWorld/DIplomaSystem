import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { GeneralResourcesService } from '../../../../base/services/general-resources.service';
import { BaseComponent } from '../../../../core/components/base-component.directive';
import { NotificationTemplate } from '../../../../base/models/dto/notification.model';
import { AppValidators } from '../../../../base/utils/validators.utils';
import { firstItem } from '../../../../core/tools/first-item';

const FORM_KEYS = {
  TYPE: 'TYPE',
  CONTENT: 'CONTENT'
};

@Component({
  selector: 'app-admin-notifications',
  templateUrl: './admin-notifications.component.html',
  styleUrls: ['./admin-notifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNotificationsComponent extends BaseComponent {
  FORM_KEYS = FORM_KEYS;
  form?: FormGroup;

  notifications?: NotificationTemplate[];

  isErrorVisible = false;

  reloadTrigger = new BehaviorSubject<boolean>(true);

  constructor(private readonly formBuilder: FormBuilder,
              private readonly generalResourcesService: GeneralResourcesService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  ngOnInit(): void {
    this.loadNotifications();
  }

  private loadNotifications(): void {
    this.addSubscription(
      this.reloadTrigger.pipe(
        switchMap(() => this.generalResourcesService.getNotifications())
      ).subscribe(notifications => {
        this.notifications = notifications;
        this.initForm(notifications);
        this.markForCheck();
      })
    );
  }

  private initForm(notifications: NotificationTemplate[]): void {
    const first = firstItem(notifications);
    this.form = this.formBuilder.group({
      [FORM_KEYS.TYPE]: [first?.label, Validators.required],
      [FORM_KEYS.CONTENT]: [first?.content, AppValidators.notificationValidator]
    });
  }

  public confirmChange(): void {
    const formData = this.form!.value;
    const payload = new NotificationTemplate();
    payload.label = formData[FORM_KEYS.TYPE];
    payload.content = formData[FORM_KEYS.CONTENT];
    const actionSource = this.generalResourcesService.modifyNotification(payload);
    this.handleAction(actionSource);
  }

  private handleAction<T>(actionSource: Observable<T>): void {
    this.addSubscription(actionSource.subscribe({
      next: () => this.reload(),
      error: () => this.isErrorVisible = true
    }));
  }

  private reload(): void {
    this.isErrorVisible = false;
    this.reloadTrigger.next(true);
  }

}
