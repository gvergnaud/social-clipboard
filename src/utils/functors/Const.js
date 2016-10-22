export default class Const {

  constructor(v) {
    this.value = v
  }

  static of(v) {
    return new Const(v)
  }

  get() {
    return this.value
  }

  map() {
    return Const.of(this.value)
  }
}

export const getConst = c => c.get()
