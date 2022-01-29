import { BaseStoreState } from '../../../core/store/base-store-state.model';
import { UserRole } from '../../models/dto/user-role.model';
import { AppLanguage } from '../../../core/models/app-language.model';

export class SessionState extends BaseStoreState {
  language?: AppLanguage;
  contextRole?: UserRole;
}
