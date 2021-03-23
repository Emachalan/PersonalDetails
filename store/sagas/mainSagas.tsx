import { all, fork, race, call, put, takeLatest } from 'redux-saga/effects';
import * as Initial from '../reducers/initial';
import { getCallReq } from '../utils/initial';

export function* firstSaga(action: any) {
  const params = action.payload;
  try {
    const { response } = yield race({
      response: call(getCallReq, params),
    });
    if (response) {
      yield put(
        Initial.actions.firstCallSuccess({
          data: response,
        }),
      );
    } else {
      yield put(Initial.actions.firstCallFailure({ message: 'Fetch failure' }));
    }
  } catch (err) {
    yield put(Initial.actions.firstCallFailure({ message: 'Fetch failure' }));
  }
}

export function* watchFirstReq() {
  yield takeLatest(Initial.constants.FIRST_CALL, firstSaga);
}

export default function* root() {
  yield all([
    fork(watchFirstReq),
  ]);
}
