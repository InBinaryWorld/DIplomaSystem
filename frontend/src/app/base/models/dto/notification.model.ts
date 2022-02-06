import { autoserialize } from 'cerialize';

export class NotificationModel {

  @autoserialize
  label!: string;

  @autoserialize
  content!: string;

}
