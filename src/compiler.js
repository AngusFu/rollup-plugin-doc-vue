const vueCompiler = require('vueify').compiler

// Hack: avoid unneccesary vueify code
process.env.VUE_ENV = 'server'

vueCompiler.applyConfig({
  extractCSS: true,
  customCompilers: {
    buble (content, cb) {
      const { code } = require('buble').transform(content)
      const ret = code
        .replace(/\n{2,}/g, '\n')
        .replace(/^\s+/, '  ')
        .replace(/\s+$/, '')

      cb(null, ret)
    }
  }
})

vueCompiler.compilePromise = (content, filePath) => {
  return new Promise((resolve, reject) => {
    vueCompiler.compile(content, filePath, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = vueCompiler