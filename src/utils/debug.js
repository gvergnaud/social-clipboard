import curry from 'lodash/fp/curry'
import throttle from 'lodash/fp/throttle'

export const log = curry((label, value) => {
  console.log(label, value) // eslint-disable-line
  return value
})

export const logPerf = f => (...args) => {
  const start = Date.now()
  const out = f(...args)
  console.log(`logPerf : ${f.name || 'Function'} took `, Date.now() - start, 'milliseconds.') // eslint-disable-line
  return out
}


export const logTrottle = (every) =>
  throttle(every, (v) => console.log(v)) // eslint-disable-line
