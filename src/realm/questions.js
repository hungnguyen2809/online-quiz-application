import Realm from 'realm';

const QUESTIONS_SCHEMA = 'QUESTIONS_SCHEMA';
const QuestionsSchema = {
  name: QUESTIONS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    id_question_set: 'int',
    content: 'string',
    as_a: 'string',
    as_b: 'string',
    as_c: 'string',
    as_d: 'string',
    final: 'string',
    status: 'int',
  },
};

const realmConfig = {
  path: 'AppQuizOnline.realm',
  schema: [QuestionsSchema],
  schemaVersion: 1,
};

export const getQuestionsByQS = (id_question_set) => {
  return new Promise(async (resolve, reject) => {
    Realm.open(realmConfig)
      .then((realm) => {
        realm.write(() => {
          let data = realm
            .objects(QUESTIONS_SCHEMA)
            .filtered(`id_question_set == ${id_question_set}`);
          resolve({data});
        });
      })
      .catch((error) => {
        reject({error});
      });
  });
};

export const addQuestionToDB = (question) => {
  return new Promise(async (resolve, reject) => {
    Realm.open(realmConfig)
      .then((realm) => {
        realm.write(() => {
          realm.create(QUESTIONS_SCHEMA, question);
          resolve({data: question});
        });
      })
      .catch((error) => {
        reject({error});
      });
  });
};
