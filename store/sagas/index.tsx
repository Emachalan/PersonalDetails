import { fork, all } from 'redux-saga/effects';
import FirstSagas from './mainSagas'

export default function* root() {
  yield all([fork(FirstSagas)]);
}
