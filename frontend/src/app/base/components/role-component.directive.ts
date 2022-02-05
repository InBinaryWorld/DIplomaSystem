import { ChangeDetectorRef, Directive } from '@angular/core';
import { BaseComponent } from '../../core/components/base-component.directive';
import { Role } from '../models/dto/role.model';
import { distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';
import { filterRoles, filterRolesWitSelector } from '../../core/tools/filter-roles';
import { UserRole } from '../models/dto/user-role.model';
import { SessionService } from '../services/session.service';
import { filterExists } from '../../core/tools/filter-exists';
import { isEmpty } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { Context } from '../models/context.model';
import { isNotNil } from '../../core/tools/is-not-nil';

@Directive()
export abstract class RoleComponent extends BaseComponent {

  protected constructor(protected readonly sessionService: SessionService,
                        changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  abstract get roles(): Role[];

  get userRoleSource(): Observable<UserRole> {
    const filter: OperatorFunction<UserRole | undefined, UserRole> = isEmpty(this.roles)
      ? filterExists() : filterRoles(this.roles);
    return this.sessionService.selectContextRole()
      .pipe(filter, distinctUntilChanged());
  }

  get contextSource(): Observable<Context> {
    const filter1: OperatorFunction<Context | undefined, Context> = isEmpty(this.roles)
      ? filterExists() : filterRolesWitSelector<Context | undefined>(this.roles, c => c?.userRole);
    return this.sessionService.selectContext()
      .pipe(filter1, filter(c => isNotNil(c.diplomaSession)), distinctUntilChanged());
  }

  public getErrorsFromArray(form: FormArray, index: number): ValidationErrors | null {
    const control = form!.controls[index]!;
    return (control.dirty || control.touched) ? control.errors : null;
  }

  public getErrors(form: FormGroup, controlName: string): ValidationErrors | null {
    const control = form!.get(controlName)!;
    return (control.dirty || control.touched) ? control.errors : null;
  }

  protected getPathParam(route: ActivatedRoute, name: string): Observable<string> {
    return route.paramMap.pipe(
      map(params => params.get(name)),
      filterExists(),
      distinctUntilChanged()
    );
  };

}
