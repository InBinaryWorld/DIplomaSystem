import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from "../../../../core/components/base/base-component.directive";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Optional } from "../../../../core/base/optional";
import { SessionStoreService } from "../../services/session-store.service";
import { LoginData } from "../../models/login-data.model";
import { distinctUntilChanged } from "rxjs";
import { SpinnerService } from "../../../../core/services/spinner.service";
import { Store } from "@ngrx/store";
import { ContextRoutingService } from "../../../../core/services/context-routing.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseComponent implements OnInit {

  error: any;
  usernameControl: Optional<FormControl>;
  passwordControl: Optional<FormControl>;
  loginFormGroup: Optional<FormGroup>;

  constructor(private readonly store: Store,
              private readonly formBuilder: FormBuilder,
              private readonly spinnerService: SpinnerService,
              private readonly contextRoutingService: ContextRoutingService,
              private readonly sessionStoreService: SessionStoreService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  login(): void {
    const data: LoginData = this.loginFormGroup!.getRawValue();
    this.sessionStoreService.login(data);
  }

  logout(): void {
    this.sessionStoreService.logout();
  }

  ngOnInit(): void {
    this.initSpinner();
    this.initForm();
    this.followProcessStatus();
  }

  private followProcessStatus(): void {
    this.sessionStoreService.getSessionError()
      .subscribe(error => {
        this.error = error;
        this.changeDetector.markForCheck();
      });
  }

  private initForm() {
    const formValidator = [Validators.required, Validators.minLength(6), Validators.maxLength(32)];
    this.usernameControl = new FormControl('JackJacky', formValidator);
    this.passwordControl = new FormControl('Daniels', formValidator);
    this.loginFormGroup = this.formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl
    });
  }

  private initSpinner() {
    this.addSubscription(
      this.sessionStoreService.getSessionActionProgress()
        .pipe(distinctUntilChanged())
        .subscribe(inProgress => this.spinnerService.act(inProgress, this.changeDetector))
    )
  }
}
