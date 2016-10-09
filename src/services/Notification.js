const notifier = require('node-notifier')

const notify = options => new Promise((resolve, reject) => {
  notifier.notify(options, (err, response) => {
    if (err) return reject(err)
    else resolve(response)
  })
})

export const newCopy = copy => notify({
  title: `new copy!`,
  message: copy,
})
