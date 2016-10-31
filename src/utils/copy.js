import curry from 'lodash/fp/curry'

export const Copy = {
  Text: 'Copy.Text',
  File: 'Copy.File',
}

export const createFileCopy = value => ({
  type: Copy.File,
  value
})

export const createTextCopy = value => ({
  type: Copy.Text,
  value
})

export const cata = curry((cases, copy) =>
  Object
    .keys(cases)
    .filter(type => type === copy.type)
    .map(type => cases[type])
    .reduce((_, mapper) => ({
      type: copy.type,
      value: mapper(copy.value)
    }), null)
)

export const extract = copy => copy.value

export const isTextCopy = copy => copy.type === Copy.Text
export const isFileCopy = copy => copy.type === Copy.File
