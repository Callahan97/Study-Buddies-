import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAvailability() {
  try {
    const response = yield axios.get('/api/tutor_availability');
    yield put({ type: 'SET_AVAILABILITY', payload: response.data });
  } catch (error) {
    console.error('Error fetching availability:', error);
  }
}


function* updateAvailability(action) {
  try {
    console.log('Updating availability with:', action.payload);
    yield axios.put('/api/tutor_availability', action.payload);
    yield put({ type: 'FETCH_AVAILABILITY' });
  } catch (error) {
    console.error('Error updating availability:', error);
  }
}

function* fetchTutorAvailability(action) {
  try {
    const { startDate, endDate, discipline } = action.payload;
    const response = yield axios.get('/api/tutor_availability/week', {
      params: { startDate, endDate, discipline },
    });
    yield put({ type: 'SET_TUTOR_AVAILABILITY', payload: response.data });
  } catch (error) {
    console.error('Error fetching tutor availability:', error);
  }
}

function* availabilitySaga() {
  yield takeLatest('FETCH_AVAILABILITY', fetchAvailability);
  yield takeLatest('UPDATE_AVAILABILITY', updateAvailability);
  yield takeLatest('FETCH_TUTOR_AVAILABILITY', fetchTutorAvailability);
}

export default availabilitySaga;