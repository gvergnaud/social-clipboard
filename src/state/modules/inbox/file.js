import { createReducer, composeMutations } from '../../../utils/moduleHelpers'
import { log } from '../../../utils/debug'
import { set, lensProp } from '../../../utils/lens'
import { START, PROGRESS, SUCCESS, ERROR, Status } from '../../actions/fileActions'

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
  error: null,
}

const setCreatedAt = state =>
  set(lensProp('createdAt'), Date.now(), state)

const setStartedAt = state =>
  set(lensProp('startedAt'), Date.now(), state)

const setEndedAt = state =>
  set(lensProp('endedAt'), Date.now(), state)

const setFilePath = (state, action) =>
  set(lensProp('filePath'), action.payload.filePath, state)

const setName = (state, action) =>
  set(lensProp('name'), action.payload.name, state)

const setPercent = (state, action) =>
  set(lensProp('progressPercent'), action.payload.percent, state)

const setError = (state, action) =>
  set(lensProp('error'), action.payload.error, state)

const setStatus = status => state =>
  set(lensProp('status'), status, state)


export default createReducer(initialState, {
  [START]: composeMutations(setCreatedAt, setStartedAt, setFilePath, setName, setStatus(Status.Downloading)),
  [PROGRESS]: composeMutations(setPercent, setStatus(Status.Downloading)),
  [SUCCESS]: composeMutations(setEndedAt, setPercent, setStatus(Status.Success)),
  [ERROR]: composeMutations(setError, setStatus(Status.Error)),
})
