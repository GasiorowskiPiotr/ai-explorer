export const aiMiddleware = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err);
        window.appInsights.trackException(err);
        throw err;
  }
};