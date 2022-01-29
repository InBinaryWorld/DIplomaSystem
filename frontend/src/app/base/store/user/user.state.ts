import { BaseStoreState } from '../../../core/store/base-store-state.model';
import { User } from '../../models/dto/user.model';

export class UserState extends BaseStoreState {
  currentUser?: User;
}
