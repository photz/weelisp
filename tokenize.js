'use strict'

const tokens = require('./tokens')

/**
 * @param {string} c
 * @return {boolean}
 */
function isWhitespace (c) {
  return ' ' === c || '\n' === c
}

/**
 * @param {string} c
 * @return {boolean}
 */
function isDigit (c) {
  let code = c.codePointAt(0)
  return '0'.codePointAt(0) <= code && code <= '9'.codePointAt(0)
}

/**
 * @param {string} c
 * @return {boolean}
 */
function isIdentifierChar (c) {
  return /^[\w-\*\+\.]$/.test(c)
}

/**
 * @param {string} c
 * @return {boolean}
 */
function isIdentifierFirstChar (c) {
  return /^[a-zA-Z-\*\+'.]$/.test(c)
}

/**
 * @param {string} input
 * @return {Generator<Object>}
 */
function* tokenize (input) {

  for (let i = 0; i < input.length; i++) {

    let c = input[i]

    if ('(' === c) {
      yield {type: tokens.LEFT_PAR}
    }
    else if (')' === c) {
      yield {type: tokens.RIGHT_PAR}
    }
    else if (isWhitespace(c)) {
      continue
    }
    else if (isDigit(c)) {
      let j
      for (j = i; j < input.length && isDigit(input[j]); j++) {}
      yield {
        type: tokens.NUMBER,
        token: parseInt(input.substring(i, j), 10)
      }
      i = j - 1
    }
    else if (isIdentifierFirstChar(c)) {
      let j
      for (j = i; j < input.length && isIdentifierChar(input[j]); j++) {}
      yield {
        type: tokens.IDENTIFIER,
        token: input.substring(i, j)
      }
      i = j - 1
    }
    else {
      throw new Error(`invalid character: ${c}`)
    }
  }

}


module.exports = tokenize
