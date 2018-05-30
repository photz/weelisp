'use strict'

const evaluate = require('./index')

let tests = [
  [
    'Addition',
    '(+ 1 2 3)',
    6
  ],
  [
    'Multiplication',
    '(* 1 2 3)',
    6
  ],
  [
    'Whitespace is ignored',
    '  (+ 1    1)  ',
    2
  ],
  [
    'Deeply nested function calls',
    '(+ (+ (+ (+ (+ 1)))))',
    1
  ],
  [
    'Variable bindings',
    '(+ foo bar)',
    55,
    {foo: 13, bar: 42}
  ],
  [
    'Subtraction with two arguments',
    '(- 10 5)',
    5
  ],
  [
    'Subtraction with more than two arguments',
    '(- 100 10 10 10 10)',
    60
  ],
  [
    'Negation',
    '(- 10)',
    -10
  ]
]

function runTest(desc, expr, expected, bindings = null) {
  let result = evaluate(expr, bindings)

  if (result !== expected) {
    console.log('✗', desc, `${result} != ${expected}`)
  }
  else {
    console.log('✓', desc)
  }
}


console.log('\n# Running Unit Tests\n')

tests.forEach(test => runTest(...test))

