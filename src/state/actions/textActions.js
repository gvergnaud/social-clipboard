export const RECEIVE = 'text.RECEIVE'

export const receive = text => ({
  type: RECEIVE,
  payload: { text }
})
