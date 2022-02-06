import { isNil } from 'lodash-es';

export interface RequestParam {
  key: string;
  value: string;
}

export class RequestParams {
  constructor(private params: RequestParam[] = []) {
  }

  getAll(): RequestParam[] {
    return this.params;
  }

  addIfValueExists(key: string, value?: boolean | number | string): RequestParams {
    if (!isNil(value)) {
      this.params.push({ key, value: String(value) });
    }
    return this;
  }

}
