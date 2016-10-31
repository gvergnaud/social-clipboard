export const START = 'file.START'
export const PROGRESS = 'file.PROGRESS'
export const SUCCESS = 'file.SUCCESS'
export const ERROR = 'file.ERROR'
export const Status = {
  Downloading: 'Status.Downloading',
  Success: 'Status.Success',
  Error: 'Status.Error',
}

export const start = (filePath, name) => ({
  type: START,
  payload: { filePath, name }
})

export const progress = percent => ({
  type: PROGRESS,
  payload: { percent }
})

export const success = () => ({
  type: SUCCESS,
  payload: { percent: 100 }
})

export const error = error => ({
  type: ERROR,
  payload: { error }
})
