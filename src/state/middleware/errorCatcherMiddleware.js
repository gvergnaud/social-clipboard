const errorCatcherMiddleware = () => next => action => {
  try {
    return next(action)
  } catch (e) {
    console.error('Action Error :', action.type, ': \n', e.stack) // eslint-disable-line no-console
  }
}

export default errorCatcherMiddleware
