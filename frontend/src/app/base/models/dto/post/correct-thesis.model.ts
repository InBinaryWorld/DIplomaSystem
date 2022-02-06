import { IdType, IdTypeSerializer } from '../id.model';
import { autoserialize, autoserializeAs } from 'cerialize';

export class CorrectThesisChanges {

  @autoserialize
  topic!: string;

  @autoserialize
  description!: string;

  @autoserialize
  numberOfStudents!: number;

}

export class CorrectThesis {

  @autoserializeAs(IdTypeSerializer)
  thesisId!: IdType;

  @autoserializeAs(CorrectThesisChanges)
  changes!: CorrectThesisChanges;
}
