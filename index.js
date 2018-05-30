'use strict'

const tokenize = require('./tokenize')
const parse = require('./parse')

const defaultBindings = {
  '*': (...args) => args.reduce((a, b) => a * b),
  '+': (...args) => args.reduce((a, b) => a + b),
  '-': (fst, ...rest) => {
    if (rest.length > 0) {
      return rest.reduce((a, b) => a - b, fst)
    } else {
      return -fst
    }
  }
}

/**
 * @param {string} expr
 * @param {Object} bindings
 * @return {number}
 */
function evaluate (expr, bindings = {}) {
  if (typeof expr !== 'string') {
    throw new TypeError('expr must be a string')
  }

  let tokenStream = tokenize(expr)

  bindings = Object.assign({}, defaultBindings, bindings)

  return parse(bindings, tokenStream)
}

module.exports = evaluate
