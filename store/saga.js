import axios from 'axios';

import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

export default function* rootSaga() {
    yield createRequestInstance({
        driver: createDriver(
            axios.create({
                baseURL: `http://localhost:${process.env.PORT || 3000}`
            })
        )
    });
    yield watchRequests();
}
