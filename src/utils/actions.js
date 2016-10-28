import curry from 'lodash/fp/curry'

export const cata = curry((cases, action) =>
  Object
    .keys(cases)
    .filter(type => type === action.type)
    .map(type => cases[type])
    .reduce((_, mapper) => ({
      type: action.type,
      payload: mapper(action.payload)
    }), null)
)
export const extract = action =>
  action.payload
