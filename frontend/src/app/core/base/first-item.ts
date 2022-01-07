import { isEmpty } from "lodash-es";

export function firstItem<T>(arr: T[]): T | null {
  if (isEmpty(arr)) {
    return null;
  }
  return arr[0];
}
