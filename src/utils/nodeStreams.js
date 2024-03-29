import Progress from 'progress-stream'
import { Observable } from 'rxjs'

export const createProgressHandler = size => {
  const progress = Progress({ length: size, time: 100 })
  const percent$ = createPercentObservable(progress)
  return { progress, percent$ }
}


const createProgressObservable = progress => new Observable(observer => {
  let isSubscribed = true
  const guard = f => (...args) => { if (isSubscribed) f(...args) }
  const onProgress = progress => {
    observer.next(progress)
    if (progress.percentage === 100) observer.complete()
  }

  progress.on('progress', guard(onProgress))

  return { unsubscribe: () => { isSubscribed = false } }
})

export const createPercentObservable = progress =>
  createProgressObservable(progress)
    .pluck('percentage')
    .map(Math.round)
    .distinctUntilChanged()
