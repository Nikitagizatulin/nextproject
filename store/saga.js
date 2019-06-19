import axios from 'axios';

const resource = process.env.RESOURCE_BASE || 'http://127.0.0.1';
const port = process.env.PORT || '8080';

axios.defaults.baseURL = `${resource}:${port}/api`;

import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

export default function* rootSaga() {
    yield createRequestInstance({ driver: createDriver(axios) });
    yield watchRequests();
}
