import inspectf from 'inspect-f'

import kebabCase from 'lodash/kebabCase'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import flowRight from 'lodash/flowRight'

const pascalCase = flowRight(upperFirst, camelCase)

export {
  kebabCase,
  camelCase,
  pascalCase
}

export function toJSON (obj) {
  if (typeof obj === 'function') {
    let str = inspectf(2, obj)

    // prepend `function ` for short style like `a(){}`
    if (!/=>/.test(str) && /^function /.test(str) === false) {
      str = 'function ' + str
    }

    return str
  }

  if (obj && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return `[${obj.map(toJSON).join(',\n')}]`
    }

    const arr = Object.keys(obj).map(key => `"${key}": ${toJSON(obj[key])}`)
    return `{${arr.join(',')}}`
  }

  return JSON.stringify(obj)
}

export function defer () {
  const deferred = {}
  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  deferred.promise = promise
  return deferred
}
