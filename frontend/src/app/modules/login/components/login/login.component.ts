import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base-component.directive';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStoreService } from '../../../../base/services/auth-store.service';
import { LoginData } from '../../../../base/models/login-data.model';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { Store } from '@ngrx/store';
import { ContextRoutingService } from '../../../../core/services/context-routing.service';
import { filter, switchMap } from 'rxjs';
import { UserStoreService } from '../../../../base/services/user-store.service';
import { SessionStoreService } from '../../../../base/services/session-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseComponent implements OnInit {

  error: any;
  usernameControl?: FormControl;
  passwordControl?: FormControl;
  loginFormGroup?: FormGroup;

  constructor(private readonly store: Store,
              private readonly formBuilder: FormBuilder,
              private readonly spinnerService: SpinnerService,
              private readonly contextRoutingService: ContextRoutingService,
              private readonly userStoreService: UserStoreService,
              private readonly authStoreService: AuthStoreService,
              private readonly sessionStoreService: SessionStoreService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }


  login(): void {
    const data: LoginData = this.loginFormGroup!.getRawValue();
    this.authStoreService.login(data);
  }

  ngOnInit(): void {
    this.initForm();
    this.handleLoginFailure();
    this.handleSuccessfulLogin();
  }

  private handleLoginFailure(): void {
    this.addSubscription(
      this.authStoreService.getAuthError()
        .subscribe(error => {
          this.error = error;
          this.changeDetector.markForCheck();
        })
    );

  }

  private handleSuccessfulLogin(): void {
    this.addSubscription(
      this.authStoreService.isUserLoggedIn().pipe(
        filter(isLogged => isLogged),
        switchMap(() => this.contextRoutingService.calculateNewUserRole())
      ).subscribe(role => this.sessionStoreService.setContextRole(role))
    );
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


}
