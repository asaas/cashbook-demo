import { Dispatcher } from 'flux';

import Action from './Action';
import { accountStore } from './AccountStore';
import { criteriaStore } from './CriteriaStore';
import { journalStore } from './JournalStore';
import { journalFormStore  } from './JournalFormStore';
import { journalTemplateStore } from './JournalTemplateStore';

export const dispatcher = new Dispatcher<Action>();

dispatcher.register(action => {
  criteriaStore.update(action);
});

const journalStoreDispatchToken = dispatcher.register(action => {
  switch (action.type) {
    case 'SubmitJournalForm': {
      const { selfAccountId } = criteriaStore.state;
      const {
        description,
        corrAccountId,
        amount
      } = journalFormStore.state;
      const selfAccount = accountStore.findAccountById(selfAccountId);
      const corrAccount = accountStore.findAccountById(corrAccountId);
      const { name:selfAccountName } = selfAccount;
      const { name:corrAccountName } = corrAccount;

      const journal = {
        selfAccountId,
        selfAccountName,
        corrAccountId,
        corrAccountName,
        description,
        amount
      };

      journalStore.update({
        type: 'AddJournal',
        journal
      });

      journalStore.update({
        type: 'FilterJournals',
        selfAccountId
      });
      break;
    }

    default:
      journalStore.update(action);
      break;
  }
});

dispatcher.register(action => {
  switch (action.type) {
    case 'SelectJournalTemplate': {
      const template = journalTemplateStore.findJournalTemplateById(action.id);

      if (template) {
        journalFormStore.update({
          type: 'ApplyJournalTemplate',
          template
        });
      }

      break;
    }

    case 'FindJournalTemplateByIndex': {
      const template = journalTemplateStore.findJournalTemplateByIndex(action.index);

      if (template) {
        journalFormStore.update({
          type: 'ApplyJournalTemplate',
          template
        });
      }

      break;
    }

    case 'SubmitJournalForm':
      dispatcher.waitFor([journalStoreDispatchToken]);

      journalFormStore.update(action);
      break;

    default:
      journalFormStore.update(action);
      break;
  }
});

dispatcher.register(action => {
  journalTemplateStore.update(action);
});
