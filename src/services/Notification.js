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
  appIcon: path.join(__dirname, '..', 'assets', 'image.jpg',),
  contentImage: path.join(__dirname, '..', 'assets', 'image.jpg',),
  open: 'file://' + path.join(__dirname, '..', 'assets', 'image.jpg'),
})

export const newFileCopy = fileName => notify({
  title: `somebody sent a file!`,
  subtitle: '',
  message: fileName,
  appIcon: path.join(__dirname, '..', 'assets', 'image.jpg',),
  contentImage: path.join(__dirname, '..', 'assets', 'image.jpg',),
  open: 'file://' + path.join(__dirname, '..', 'assets', 'image.jpg'),
})


export const sentTextCopy = text => notify({
  title: `Success!`,
  message: `you just sent ${text}`,
})

export const sentFileCopy = fileName => notify({
  title: `Success!`,
  subtitle: 'you just sent a file',
  message: `${fileName}`,
})
