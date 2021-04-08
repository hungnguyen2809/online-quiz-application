import {combineReducers} from 'redux';
import AccountReducer from './Account/reducers';
import TopicsReducer from './Topics/reducers';
import QuestionSetReducer from './QuestionSet/reducers';
import QuestionsReducer from './Questions/reducers';

export const rootReducers = combineReducers({
  accountInfo: AccountReducer,
  topics: TopicsReducer,
  questionSet: QuestionSetReducer,
  questions: QuestionsReducer,
});
