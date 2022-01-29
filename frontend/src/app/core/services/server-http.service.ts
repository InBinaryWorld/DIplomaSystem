import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isEmpty } from 'lodash-es';
import { SettingsService } from './settings.service';
import { RequestParams } from '../models/request-param.model';
import { ApiLabel } from '../models/api-route.model';
import { FakeSessionData } from '../../../fakes/fake.data';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';


@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {

  constructor(private readonly http: HttpClient,
              private readonly settingsService: SettingsService,
              private readonly spinnerService: SpinnerService) {
  }

  private get serverUrl(): string {
    return this.settingsService.serverBaseUrl;
  }

  doFakeRequest<T>(apiLabel: ApiLabel): Observable<T> {
    return of(FakeSessionData.handleApiLabel(apiLabel)).pipe(
      tap(() => this.spinnerService.show()),
      delay(this.settingsService.fakeApiDelay()),
      tap(() => this.spinnerService.hide())
    );
  }

  getWithLabel<T>(apiLabel: ApiLabel, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const urlTemplate = this.settingsService.getServerApi(apiLabel);
    if (this.settingsService.isFakeApiEnabled()) {
      return this.doFakeRequest<T>(apiLabel);
    }
    return this.get<T>(urlTemplate, params, query, headers);
  }

  get<T>(pathTemplate: string, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(this.serverUrl, path);
    return this.http.get<T>(url, { headers });
  }

  postWithLabel<T>(apiLabel: ApiLabel, body: any, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const urlTemplate = this.settingsService.getServerApi(apiLabel);
    if (this.settingsService.isFakeApiEnabled()) {
      return this.doFakeRequest<T>(apiLabel);
    }
    return this.post<T>(urlTemplate, body, params, query, headers);
  }


  post<T>(pathTemplate: string, body: any, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(this.serverUrl, path);
    return this.http.post<T>(url, body, { headers });
  }

  private buildPath(url: string, params?: RequestParams, query?: RequestParams): string {
    const parameters = params?.getAll() ?? [];
    const queryParams = query?.getAll() ?? [];
    const urlWithParams = parameters.reduce((workingUrl, param) =>
      workingUrl.replace(`:${param.name}`, param.value), url);
    const queryTail = queryParams.map(param => `${param.name}=${param.value}`).join('&');
    return isEmpty(queryTail) ? urlWithParams : `${urlWithParams}?${queryTail}`;
  }

  private joinPathParts(...parts: string[]): string {
    if (isEmpty(parts)) {
      return '';
    }
    const firstPart = parts[0].replace(/(?<=.)\/$/, '');
    const items = parts.slice(1).map(item => item.replace(/^\/|\/$/g, ''));
    items.unshift(firstPart);
    return items.filter(item => !isEmpty(item)).join('/');
  }
}
