import { createReducer, composeMutations } from '../../utils/moduleHelpers'
import { set, lensProp } from '../../utils/lens'
import { START, PROGRESS, SUCCESS, ERROR, Status } from '../actions/fileActions'

/* ----------------------------------------- *
        Reducer
* ----------------------------------------- */

const initialState = {
  createdAt: null,
  startedAt: null,
  endedAt: null,
  filePath: '',
  name: '',
  status: Status.Downloading,
  progressPercent: 0,
  error: {},
}

const setCreatedAt = state =>
  set(lensProp('createdAt'), Date.now(), state)

const setStartedAt = state =>
  set(lensProp('startedAt'), Date.now(), state)

const setEndedAt = state =>
  set(lensProp('endedAt'), Date.now(), state)

const setFilePath = (state, payload) =>
  set(lensProp('filePath'), payload.filePath, state)

const setName = (state, payload) =>
  set(lensProp('name'), payload.name, state)

const setPercent = (state, payload) =>
  set(lensProp('progressPercent'), payload.percent, state)

const setError = (state, payload) =>
  set(lensProp('error'), payload.error, state)

const setStatus = status => state =>
  set(lensProp('status'), status, state)


export default createReducer(initialState, {
  [START]: composeMutations(setCreatedAt, setStartedAt, setFilePath, setName, setStatus(Status.Downloading)),
  [PROGRESS]: composeMutations(setPercent, setStatus(Status.Downloading)),
  [SUCCESS]: composeMutations(setEndedAt, setStatus(Status.Success)),
  [ERROR]: composeMutations(setError, setStatus(Status.Error)),
})
