import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from "../../../../core/components/base/base-component.directive";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Optional } from "../../../../core/base/optional";
import { SessionStoreService } from "../../services/session-store.service";
import { Router } from "@angular/router";
import { LoginData } from "../../models/login-data.model";
import { distinctUntilChanged, filter } from "rxjs";
import { SpinnerService } from "../../../../core/services/spinner.service";
import { Store } from "@ngrx/store";

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

  constructor(private readonly router: Router,
              private readonly store: Store,
              private readonly formBuilder: FormBuilder,
              private readonly spinnerService: SpinnerService,
              public readonly sessionStoreService: SessionStoreService,
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
    this.followLoginSucceed();
    this.followProcessStatus();

    this.addSubscription(
      this.store
        .subscribe(data => console.log(data))
    );
  }

  private followProcessStatus(): void {
    this.sessionStoreService.getSessionError()
      .subscribe(error => {
        this.error = error;
        this.changeDetector.markForCheck();
      });
  }

  private followLoginSucceed(): void {
    this.addSubscription(
      this.sessionStoreService.isUserLoggedIn()
        .pipe(filter(isLoggedIn => isLoggedIn))
        .subscribe(() => this.handleLoginSucceed())
    );
  }

  private handleLoginSucceed(): void {
    this.router.navigate(['/top']).then();
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
