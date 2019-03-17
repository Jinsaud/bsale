import Product from './Product'

export default class Collection {

  constructor(products) {
    this.products = products.map(product => new Product({ product }))
  }

  getJSON() { }

  getHTML() { }
}
