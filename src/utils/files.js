import fs from 'fs'

export const fileStat = filePath => new Promise((resolve, reject) => {
  fs.stat(filePath, (err, data) => {
    if (err) return reject(err)
    resolve(data)
  })
})
