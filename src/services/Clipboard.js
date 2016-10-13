import $ from 'nodobjc'
import { parseString as parseXMLString } from 'xml2js'
import { clipboard } from 'electron'
import { log } from '../utils/debug'

/**
 * use nodeObjC to get the native clipboard info. Idea found on github
 * @see https://github.com/electron/electron/issues/2244
 *
 * if you have a node module version mismatch, run :
 *
 * `npm rebuild --runtime=electron --target=1.4.3 --disturl=https://atom.io/download/atom-shell --abi=50`
 *
 * where 1.3.4 is your electron version and 49 is the abi it's expecting.
 * @see https://github.com/electron-userland/electron-builder/issues/453#issuecomment-243341716
 */

$.framework('Foundation')
$.framework('AppKit')


const pool = $.NSAutoreleasePool('alloc')('init')

const pb = $.NSPasteboard('generalPasteboard')

const read = type => {
  const dt = pb('dataForType', type)
  return $.NSString('alloc')('initWithData', dt, 'encoding', $.NSUTF8StringEncoding)
}

export const readFilenames = () => read($.NSFilenamesPboardType)

export const readText = () => read($.NSStringPboardType)

export const isFile = () => !!`${readFilenames()}`

export const getFilePaths = () => new Promise((resolve, reject) => {
  parseXMLString(readFilenames(), function (err, result) {
    if (err) return reject(err)
    try {
      const paths = resolve(result.plist.array[0].string)
    } catch (e) {
      reject(new Error('getClipboardFilePaths : no files in clipboard'))
    }
  })
})

// writeFileWithPath :: String -> Boolean
export const writeFileWithPath = path => {
  const nsStringPath = $.NSString('stringWithUTF8String', path)
  const object = $.NSURL('alloc')('initFileURLWithPath', nsStringPath)

  pb('clearContents')

  const objectsToCopy = $.NSMutableArray('alloc')('init')

  objectsToCopy('addObject', object)

  const success = pb('writeObjects', objectsToCopy)

   // garbage collection
  object('release')
  objectsToCopy('release')

  return success
}

export const onClipboardChange = f => {
  let prevCount = pb('changeCount')
  const interval = setInterval(() => {
    const count = pb('changeCount')
    if (count !== prevCount) {
      prevCount = count
      f()
    }
  }, 300)
  return () => clearInteval(interval)
}


export const writeText = clipboard.writeText
