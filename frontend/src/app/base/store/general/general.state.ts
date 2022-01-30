import { BaseStoreState } from '../../../core/store/base-store-state.model';
import { Timetable } from '../../models/dto/timetable.model';
import { DiplomaSession } from '../../models/dto/diploma-session.model';
import { FieldOfStudy } from '../../models/dto/field-of-study.model';
import { Department } from '../../models/dto/department.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { GeneralResourceType } from '../../models/general-store-key.model';
import { keyBy } from 'lodash-es';
import { WithId } from '../../models/dto/id.model';

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
  [GeneralResourceType.TIMETABLES] = new GeneralResource<Timetable>();
  [GeneralResourceType.DIPLOMA_SESSIONS] = new GeneralResource<DiplomaSession>();
  [GeneralResourceType.FIELDS_OF_STUDY] = new GeneralResource<FieldOfStudy>();
  [GeneralResourceType.DEPARTMENTS] = new GeneralResource<Department>();
}
