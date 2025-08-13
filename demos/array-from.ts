const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}

const arr2 = Array.from(arrayLike) // ['a', 'b', 'c']

// eslint-disable-next-line no-console
console.log(arr2)
