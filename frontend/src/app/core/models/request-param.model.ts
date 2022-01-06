import { isNil } from "lodash-es";

export interface RequestParam {
  name: string;
  value: string;
}

export class RequestParams {
  constructor(private params: RequestParam[] = []) {
  }

  getAll(): RequestParam[] {
    return this.params;
  }

  addIfValueExists(name: string, value?: string): RequestParams {
    if (!isNil(value)) {
      this.params.push({ name, value });
    }
    return this;
  }

}
