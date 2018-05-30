'use strict'

const tokens = require('./tokens')
const List = require('immutable').List

/**
 * @param {Object} registry
 * @param {List} ts
 * @return {List}
 */
function parseExpr (registry, ts) {
  if (ts.first().type === tokens.LEFT_PAR) {
    ts = ts.shift()

    if (ts.first().type !== tokens.IDENTIFIER) {
      throw new Error(`expected an identifier`)
    }

    let ident = ts.first().token

    if (!registry.hasOwnProperty(ident)) {
      throw new Error(`unknown identifier ${ident}`)
    }

    let entry = registry[ident]

    if (typeof entry !== 'function') {
      throw new Error(`${ident} is not callable`)
    }

    let args = List()

    while (ts.first().type !== tokens.RIGHT_PAR) {
      let {expr, rest} = parseExpr(registry, ts)
      args = args.push(expr)
      ts = rest
    }

    if (ts.first().type !== tokens.RIGHT_PAR) {
      throw new Error(`expected ), got ${ts.first().type}`)
    }

    return {
      expr: entry.call(...args),
      rest: ts.rest()
    }
  }
  else if (ts.first().type === tokens.IDENTIFIER) {
    let ident = ts.first().token

    if (!registry.hasOwnProperty(ident)) {
      throw new Error(`unknown identifier ${ident}`)
    }

    let entry = registry[ident]

    return {
      expr: entry,
      rest: ts.rest()
    }
  }
  else if (ts.first().type === tokens.NUMBER) {
    return {
      expr: ts.first().token,
      rest: ts.rest()
    }
  }
  else {
    throw new Error(`unexpected token ${ts.first().type}`)
  }
}

/**
 * @param {Object} registry
 * @param {Generator<Object>} tokenStream
 * @return {Object}
 */
function parse (registry, tokenStream) {
  let tokens = List(tokenStream)
  let { expr } = parseExpr(registry, tokens)
  return expr
}

module.exports = parse
