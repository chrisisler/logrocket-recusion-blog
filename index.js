// "a tree that models the neighborhoods in the city of New York"
const locations = [
  'New York', 
  [
    'Manhattan',
    [
      'Harlem', 'Upper East Side'
    ]
  ],
  [
    'Brooklyn'
  ]
]

const isEmpty = list => list.length === 0

const isNode = item => !Array.isArray(item)

const first = list => list[0]

const rest = list => list.slice(1)


// "return true if it finds a match, otherwise false"
function includes(item, list) {
  if (isEmpty(list)) {
    return false
  }

  const head = first(list)
  const tail = rest(list)

  if (isNode(head)) {
    // ignore potential type difference `==`
    if (head == item) {
      return true
    } else {
      // otherwise recurse on remaining items in `list`
      return includes(item, tail)
    }
  } else {
    // `head` is a list, traverse through it
    if (includes(item, head)) {
      return true
    } else {
      return includes(item, tail)
    }
  }
}
// Rewriting `includes` with wavematch: github.com/chrisisler/wavematch
const _includes = wavematch.create(
  (_, list = []) => false,
  (item, list = Array) => includes(item, first(list)) || includes(item, rest(list)),
  (item, list) => first(list) == item || includes(item, rest(list))
)

const concat = Function.call.bind(Array.prototype.concat)

// "takes a string and a list as input and returns the list with all
// occurrences of the string removed"
function remove(item, list) {
  if (isEmpty(list)) {
    return list
  }

  const head = first(list)
  const tail = rest(list)
  
  if (isNode(head)) {
    if (head == item) {
      return remove(item, tail)
    } else {
      return concat(head, remove(item, tail))
    }
  } else {
    return concat(
      remove(item, head),
      remove(item, tail)
    )
  }
}

// "takes a string and a list as input and returns the number of times the
// string appears in the list"
function occur(item, list) {
  if (isEmpty(list)) {
    return 0
  }

  const head = first(list)
  const tail = rest(list)
  
  if (isNode(head)) {
    if (head == item) {
      return 1 + occur(item, tail)
    } else {
      return occur(item, tail)
    }
  } else {
    // first element is a list, traverse it
    return occur(item, head) + occur(item, tail)
  }
}

// Uncomment and run (`$ node index.js`) to see output:
// console.log(occur('New York', locations))
