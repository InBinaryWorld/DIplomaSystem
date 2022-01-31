import { createAction, props } from '@ngrx/store';
import { UserRole } from '../../models/dto/user-role.model';
import { AppLanguage } from '../../../core/models/app-language.model';


export const setContextRoleAction = createAction('[SESSION] Set user role', props<{ contextRole?: UserRole }>());
export const setLanguageAction = createAction('[SESSION] Set language', props<{ language: AppLanguage }>());
