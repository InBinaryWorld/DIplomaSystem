import { BaseStoreState } from '../../../core/store/base-store-state.model';
import { Timetable } from '../../models/dto/timetable.model';
import { DiplomaSession } from '../../models/dto/diploma-session.model';
import { FieldOfStudy } from '../../models/dto/field-of-study.model';
import { Department } from '../../models/dto/department.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { keyBy } from 'lodash-es';
import { WithId } from '../../models/dto/id.model';

export enum GeneralStoreType {
  TIMETABLES = 'TIMETABLES',
  DIPLOMA_SESSIONS = 'DIPLOMA_SESSIONS',
  FIELDS_OF_STUDY = 'FIELDS_OF_STUDY',
  DEPARTMENTS = 'DEPARTMENTS',
}

export class GeneralResource<T extends WithId> {
  allFetched = false;
  resourcesById: Dictionary<T> = {};

  static forAll<T extends WithId>(resources: T[]): GeneralResource<T> {
    const r = new GeneralResource<T>();
    r.resourcesById = keyBy(resources, r => r.id);
    r.allFetched = true;
    return r;
  }
}

export class GeneralState extends BaseStoreState {
  [GeneralStoreType.TIMETABLES] = new GeneralResource<Timetable>();
  [GeneralStoreType.DIPLOMA_SESSIONS] = new GeneralResource<DiplomaSession>();
  [GeneralStoreType.FIELDS_OF_STUDY] = new GeneralResource<FieldOfStudy>();
  [GeneralStoreType.DEPARTMENTS] = new GeneralResource<Department>();
}
