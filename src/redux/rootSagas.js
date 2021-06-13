import AccountSagas from './Account/sagas';
import TopicsSagas from './Topics/sagas';
import QuestionSetSagas from './QuestionSet/sagas';
import QuestionSagas from './Questions/sagas';
import UserQuestionSagas from './UserQuestion/sagas';
import PostSagas from './Post/sagas';

export const rootSagas = [
  AccountSagas,
  TopicsSagas,
  QuestionSetSagas,
  QuestionSagas,
  UserQuestionSagas,
  PostSagas,
];
