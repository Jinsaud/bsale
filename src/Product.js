import Variant from './Variant'
import Collection from './Collection'

export default class Product {

  constructor({ product, variants = [], related = [], accessories = [] }) {
    Object.keys(product).forEach(prop => {
      this[prop] = product[prop]
    })
    if (variants.length) {
      this.variants = variants.map(variant => new Variant(variant))
    }
    if (related.length) {
      this.related = new Collection(related)
    }
    if (accessories.length) {
      this.accessories = new Collection(accessories)
    }
  }

  getJSON() { }

  getHTML() { }
}
