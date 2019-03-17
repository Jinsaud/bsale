export default class Variant {

  constructor(variant) {
    Object.keys(variant).forEach(prop => {
      this[prop] = variant[prop]
    })
  }

  getJSON() {}

  getHTML() {}
}
