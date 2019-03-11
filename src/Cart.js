import Product from './Product'

export default class Cart {

  constructor() {
    this.items = []
    this.create()
  }

  create() {
    $.get('/cart/get_total_cart/', data => {
      this.items = data.items
      callback(data)
    })
  }

  add(product, callback) {
    if (product instanceof Product) {
      const { id, quantity } = product
      $.get(`/product/create/${id}`, { q: quantity }, data => {
        this.items = [
          ...this.items,
          product
        ]
        callback(data)
      })
    }
    else {}
  }

  update(id, quantity, callback) {
    $.get(`/cart/update_detail/${id}`, { q: quantity }, callback)
  }

  remove(id, callback) {
    $.get(`/cart/delete_detail/${id}`, callback)
  }
}
