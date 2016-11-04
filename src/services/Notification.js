const notifier = require('node-notifier')

export const notify = options => new Promise((resolve, reject) => {
  notifier.notify(options, (err, response) => {
    if (err) return reject(err)
    resolve(response)
  })
}).catch(err => console.error('Notification error :', err))

export const newTextCopy = text => notify({
  title: 'new copy!',
  message: text,
})

export const textCopySent = text => notify({
  title: 'Success!',
  message: `you just sent ${text}`,
})

export const sendFileProgress = ({ name, percentage }) => notify({
  title: `Sending ${name}...`,
  message: `progress: ${percentage}%`,
})

export const receiveFileProgress = ({ name, percentage }) => notify({
  title: `Receiving ${name}...`,
  message: `progress: ${percentage}%`,
})

export const receiveFileSuccess = name => notify({
  title: `${name} received`,
  message: 'it has been added to you clipboard. Past it anywhere!',
})

export const fileSent = name => notify({
  title: 'Success!',
  subtitle: 'you just sent a file',
  message: `${name}`,
})
