import compose from 'lodash/fp/compose'

export const composeTransformations = (...mutations) => (state, action) =>
  mutations.reduceRight((mutatedState, mutation) => mutation(mutatedState, action), state)

export const createReducer = (initialState, handlers) =>
  (state = initialState, action) =>
    handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state

/* eslint-disable  no-console */
export const log = (state, action) => {
  console.log('State : ', state)
  console.log('Action : ', action)
  return state
}
/* eslint-disable */

export const nothing = (state) => state

export const createAsyncTypes = (constant) => ({
  REQUEST: `${constant}.REQUEST`,
  SUCCESS: `${constant}.SUCCESS`,
  ERROR: `${constant}.ERROR`
})


export const noopAction = () => ({ type: 'NOOP' })
