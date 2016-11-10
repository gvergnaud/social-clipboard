const notifier = require('node-notifier')

export const notify = options => new Promise((resolve, reject) => {
  notifier.notify(options, (err, response) => {
    if (err) return reject(err)
    return resolve(response)
  })
}).catch(err => console.error('Notification error :', err))

export const receiveText = text => notify({
  title: 'Text received!',
  message: text,
})

export const textSent = text => notify({
  title: 'Success!',
  message: `you just sent ${text}`,
})

export const sendFileProgress = ({ name, percent }) => notify({
  title: `Sending ${name}...`,
  message: `progress: ${percent}%`,
})

export const sendfileSuccess = name => notify({
  title: 'Success!',
  subtitle: 'you just sent a file',
  message: `${name}`,
})

export const receiveFileProgress = ({ name, percent }) => notify({
  title: `Receiving ${name}...`,
  message: `progress: ${percent}%`,
})

export const receiveFileSuccess = name => notify({
  title: `${name} received`,
  message: 'it has been added to you clipboard. Past it anywhere!',
})
