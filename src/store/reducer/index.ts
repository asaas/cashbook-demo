import { combineReducers } from 'redux';

import accountsReducer from './accountsSlice';
import criteriaReducer from './criteriaSlice';
import journalsReducer from './journalsSlice';
import journalFormReducer from './journalFormSlice';
import journalTemplatesReducer from './journalTemplatesSlice';

const rootReducer = combineReducers({
  accounts: accountsReducer,
  criteria: criteriaReducer,
  journals: journalsReducer,
  journalForm: journalFormReducer,
  journalTemplates: journalTemplatesReducer
});

export default rootReducer;
