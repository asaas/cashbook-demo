import { Journal } from '../types/journal';
import { JournalTemplate } from '../types/journal-template';

interface ChangeSelfAccount {
  type: 'ChangeSelfAccount';
  selfAccountId: number;
}

interface ChangeDescription {
  type: 'ChangeDescription';
  description: string;
}

interface ChangeCorrAccount {
  type: 'ChangeCorrAccount';
  corrAccountId: number;
}

interface ChangeAmount {
  type: 'ChangeAmount';
  amount: string;
}

interface ShowJournalTemplates {
  type: 'ShowJournalTemplates';
}

interface HideJournalTemplates {
  type: 'HideJournalTemplates';
}

interface SelectJournalTemplate {
  type: 'SelectJournalTemplate';
  id: number;
}

interface FindJournalTemplateByIndex {
  type: 'FindJournalTemplateByIndex';
  index: string;
}

interface ApplyJournalTemplate {
  type: 'ApplyJournalTemplate';
  template: JournalTemplate;
}

interface SubmitJournalForm {
  type: 'SubmitJournalForm';
}

interface AddJournal {
  type: 'AddJournal';
  journal: Omit<Journal, 'id'>;
}

interface FilterJournals {
  type: 'FilterJournals';
  selfAccountId: number;
}

interface ClearJournalForm {
  type: 'ClearJournalForm';
}

type Action =
  | ChangeSelfAccount
  | ChangeDescription
  | ChangeCorrAccount
  | ChangeAmount
  | ShowJournalTemplates
  | HideJournalTemplates
  | SelectJournalTemplate
  | FindJournalTemplateByIndex
  | ApplyJournalTemplate
  | SubmitJournalForm
  | AddJournal
  | FilterJournals
  | ClearJournalForm

export default Action
