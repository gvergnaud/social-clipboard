import compose from 'lodash/fp/compose'
import curry from 'lodash/fp/curry'
import reduce from 'lodash/fp/reduce'
import Const, { getConst } from './functors/Const'
import Identity, { runIdentity } from './functors/Identity'

const map = curry((mapper, xs) => xs.map(mapper))

/* ----------------------------------------- *
        Lenses définition
* ----------------------------------------- */

// Getter :: (Key, Object) -> a
// Setter :: (Key, a, Object) -> Object

// createLens :: Getter -> Setter -> Key -> Functor f -> Object
export const createLens = curry((getter, setter, key, f, obj) =>
  map(value => setter(key, value, obj), f(getter(key, obj)))
)

// identityLens :: Functor f -> a -> f a
export const identityLens = createLens(
  (key, obj) => obj,
  (key, value) => value,
  '_' // no key needed
)

// lensProp :: String -> Functor f -> Object -> f Object
export const lensProp = createLens(
  (key, obj) => obj[key],
  (key, value, obj) => ({ ...obj, [key]: value })
)

// lensProps :: [String] -> Functor f -> Object -> f Object
export const lensProps = (...keys) => compose(...keys.map(key => lensProp(key)))


// immutableLens :: Key -> Functor f -> Map -> f Map
export const immutableLens = createLens(
  (key, x) => x.get(key),
  (key, value, x) => x.set(key, value)
)

// num :: Number -> Functor f -> [x] -> f [x]
export const num = createLens(
  (index, arr) => arr[index],
  (index, value, arr) => [ ...arr.split(0, index), value, ...arr.split(index + 1) ]
)

// mapped :: (a -> Identity b) -> [a] -> Identity [b]
export const mapped = curry((f, xs) => Identity.of(map(compose(runIdentity, f), xs)))

// mappedValues :: (a -> Identity b) -> { [String]: a } -> Identity { [String]: b }
export const mappedValues = curry((f, obj) => Identity.of(reduce((acc, key) => ({
  ...acc,
  [key]: compose(runIdentity, f)(obj[key]),
}), {}, Object.keys(obj))))


/* ----------------------------------------- *
        The 3 methods
* ----------------------------------------- */
// s = data structure
// a = value of a specific key or index
// Lens s a = Lens of a defined data structure (Object, Array...) and a defined key or index

// view :: Lens s a -> s -> a
export const view = curry((lens, x) => compose(getConst, lens(Const.of))(x))

// over :: Lens s a -> (a -> a) -> s -> s
export const over = curry((lens, f, x) => compose(runIdentity, lens(compose(Identity.of, f)))(x))

// set :: Lens s a -> a -> s -> s
export const set = curry((lens, v, x) => over(lens, () => v, x))

/* ----------------------------------------- *
        Helper
* ----------------------------------------- */

export const makeLenses = (...keys) => keys.reduce((acc, key) => ({
  ...acc,
  [key]: lensProp(key),
}), { num, mapped })
