const notifier = require('node-notifier')
const path = require('path')

const notify = options => new Promise((resolve, reject) => {
  notifier.notify(options, (err, response) => {
    if (err) return reject(err)
    else resolve(response)
  })
}).catch(err => console.error('Notification error :', err))

export const newTextCopy = text => notify({
  title: `new copy!`,
  message: text,
  appIcon: path.join(__dirname, '..', 'assets', 'image.jpg'),
  contentImage: path.join(__dirname, '..', 'assets', 'image.jpg'),
  open: 'file://' + path.join(__dirname, '..', 'assets', 'image.jpg'),
})

export const textCopySent = text => notify({
  title: `Success!`,
  message: `you just sent ${text}`,
})

export const newFile = name => notify({
  title: `somebody sent a file!`,
  subtitle: '',
  message: name,
  appIcon: path.join(__dirname, '..', 'assets', 'image.jpg'),
  contentImage: path.join(__dirname, '..', 'assets', 'image.jpg'),
  open: 'file://' + path.join(__dirname, '..', 'assets', 'image.jpg'),
})

export const sendFileProgress = ({ name, percentage }) => notify({
  title: `Sending ${name}...`,
  message: `progress: ${percentage}%`,
  appIcon: path.join(__dirname, '..', 'assets', 'image.jpg'),
})

export const receiveFileProgress = ({ name, percentage }) => notify({
  title: `Receiving ${name}...`,
  message: `progress: ${percentage}%`,
  appIcon: path.join(__dirname, '..', 'assets', 'image.jpg'),
})

export const fileSent = name => notify({
  title: `Success!`,
  subtitle: 'you just sent a file',
  message: `${name}`,
})
