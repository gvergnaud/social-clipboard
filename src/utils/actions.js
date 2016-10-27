export const cata = cases => action =>
  Object
    .keys(cases)
    .filter(type => type === action.type)
    .map(type => cases[type])
    .reduce((_, mapper) => ({
      type: action.type,
      payload: mapper(action.payload)
    }), null)

export const extract = action =>
  action.payload
