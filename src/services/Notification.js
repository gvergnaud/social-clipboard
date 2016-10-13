const notifier = require('node-notifier')
const path = require('path')

const notify = options => new Promise((resolve, reject) => {
  notifier.notify(options, (err, response) => {
    if (err) return reject(err)
    else resolve(response)
  })
}).catch(err => console.error('Notification error :', err))

export const newCopy = copy => notify({
  title: `new copy!`,
  message: copy,
  appIcon: path.join(__dirname, '..', 'assets', 'image.jpg',),
  contentImage: path.join(__dirname, '..', 'assets', 'image.jpg',),
  open: 'file://' + path.join(__dirname, '..', 'assets', 'image.jpg'),
})

export const sentCopy = copy => notify({
  title: `Success!`,
  message: `you just sent ${copy}`,
})
