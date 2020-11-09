import { fork, takeLatest, select, put } from 'redux-saga/effects';

function* findAccountById(id) {
  const accounts = yield select(_ => _.accounts);

  return accounts.find(_ => _.id === id);
}

function* findJournalTemplateById(id) {
  const templates = yield select(_ => _.journalTemplates.journalTemplates);

  return templates.find(_ => _.id === id);
}

function* findJournalTemplateByIndex(index) {
  const templates = yield select(_ => _.journalTemplates.filteredJournalTemplates);

  return templates.find((_, i) => `-${i + 1}` === index);
}

function* submitJournalFormHandler() {
  const { selfAccountId } = yield select(_ => _.criteria);
  const {
    description,
    corrAccountId,
    amount
  } = yield select(_ => _.journalForm);
  const selfAccount = yield findAccountById(selfAccountId);
  const corrAccount = yield findAccountById(corrAccountId);
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

  yield put({
    type: 'AddJournal',
    journal
  });

  yield put({
    type: 'FilterJournals',
    selfAccountId
  });

  yield put({
    type: 'ClearJournalForm',
    selfAccountId
  });
}

function* selectJournalTemplateHandler(action) {
  const template = yield findJournalTemplateById(action.id);

  yield put({
    type: 'ApplyJournalTemplate',
    template
  });
}

function* findJournalTemplateByIndexHandler(action) {
  const template = yield findJournalTemplateByIndex(action.index);

  if (template) {
    yield put({
      type: 'ApplyJournalTemplate',
      template
    });
  }
}

function* takeSubmitJournalForm() {
  yield takeLatest('SubmitJournalForm', submitJournalFormHandler);
}

function* takeSelectJournalTemplate() {
  yield takeLatest('SelectJournalTemplate', selectJournalTemplateHandler);
}

function* takeFindJournalTemplateByIndex() {
  yield takeLatest('FindJournalTemplateByIndex', findJournalTemplateByIndexHandler);
}

export default function* rootSaga() {
  yield fork(takeSubmitJournalForm);
  yield fork(takeSelectJournalTemplate);
  yield fork(takeFindJournalTemplateByIndex);
}
