import { signInSuccess } from './userSlice.js';

const localStorageMiddleware = store => next => action => {
    if (action.type === signInSuccess.type) {
        const { currentUser } = action.payload;
        localStorage.setItem('user', JSON.stringify(currentUser));
    }

    return next(action);
};

export default localStorageMiddleware;
