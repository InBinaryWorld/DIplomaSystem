import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { BaseApiService } from './base-api.service';
import { IdType } from '../../models/dto/id.model';
import {
  LoadDepartmentsActionOptions,
  LoadDiplomaSessionsActionOptions,
  LoadFieldsOfStudyActionOptions,
  LoadTimetablesActionOptions
} from '../../store/general/general.actions';
import { Timetable } from '../../models/dto/timetable.model';
import { DiplomaSession } from '../../models/dto/diploma-session.model';
import { Department } from '../../models/dto/department.model';
import { FieldOfStudy } from '../../models/dto/field-of-study.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesApiService extends BaseApiService {

  constructor(private readonly http: ServerHttpService) {
    super();
  }

  public getTimetables(options: LoadTimetablesActionOptions): Observable<Timetable[]> {
    return this.http.getWithLabel(ApiLabel.GET_TIMETABLES);
  }

  public getDiplomaSessions(options: LoadDiplomaSessionsActionOptions): Observable<DiplomaSession[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('departmentId', options.departmentId);
    queryParams.addIfValueExists('fieldOfStudyId', options.fieldOfStudyId);
    return this.http.getWithLabel(ApiLabel.GET_DIPLOMA_SESSIONS);
  }

  public getDepartments(options: LoadDepartmentsActionOptions): Observable<Department[]> {
    return this.http.getWithLabel(ApiLabel.GET_DEPARTMENTS);
  }

  public getFieldsOfStudy(options: LoadFieldsOfStudyActionOptions): Observable<FieldOfStudy[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('departmentId', options.departmentId);
    return this.http.getWithLabel(ApiLabel.GET_FIELDS_OF_STUDY, undefined, queryParams);
  }

  public getTimetableForId(id: IdType): Observable<Timetable> {
    return this.http.getWithLabel(ApiLabel.GET_TIMETABLE);
  }

  public getDiplomaSessionForId(id: IdType): Observable<DiplomaSession> {
    return this.http.getWithLabel(ApiLabel.GET_DIPLOMA_SESSION);
  }

  public getDepartmentForId(id: IdType): Observable<Department> {
    return this.http.getWithLabel(ApiLabel.GET_DEPARTMENT);
  }

  public getFieldOfStudyForId(id: IdType): Observable<FieldOfStudy> {
    return this.getResourceForId(ApiLabel.GET_FIELD_OF_STUDY, id);
  }

  getResourceForId<T>(apiLabel: ApiLabel, id: IdType): Observable<T> {
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getWithLabel(apiLabel, undefined, query);
  }

}
