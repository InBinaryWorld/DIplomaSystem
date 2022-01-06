import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isEmpty } from 'lodash-es';
import { first, map, mergeMap } from 'rxjs/operators';
import { SettingsService } from './settings.service';
import { SessionStoreService } from "../../modules/login/services/session-store.service";
import { RequestParams } from "../models/request-param.model";


@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {

  constructor(private readonly http: HttpClient,
              private readonly settingsService: SettingsService,
              private readonly sessionStoreService: SessionStoreService) {
  }

  private get serverUrl(): string {
    return this.settingsService.serverBaseUrl;
  }

  getWithoutAuth<T>(pathTemplate: string, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(this.serverUrl, path);
    return this.http.get(url, { headers }) as Observable<T>;
  }

  postWithoutAuth<T>(pathTemplate: string, body: any, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(this.serverUrl, path);
    return this.http.post(url, body, { headers }) as Observable<T>;
  }

  get<T>(pathTemplate: string, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(this.serverUrl, path);
    return this.getSessionBarerToken().pipe(
      mergeMap(token => {
        headers.append('Authorization', token);
        return this.http.get(url, { headers }) as Observable<T>;
      })
    );
  }

  post<T>(pathTemplate: string, body: any, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(this.serverUrl, path);
    return this.getSessionBarerToken().pipe(
      mergeMap(token => {
        headers.append('Authorization', token);
        const options = headers && { headers };
        return this.http.post(url, body, options) as Observable<T>;
      })
    );
  }

  private getSessionBarerToken(): Observable<string> {
    return this.sessionStoreService.getSessionData().pipe(first(), map(data => 'Bearer ' + data!.token));
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
