import Product from './Product'

export default class Cart {

  constructor() {
    this.items = []
    this.created = null
    this.legacyCart = null
    this.create()
  }

  create() {
    fetch('/cart/get_total_cart/')
      .then(data => {
        this.legacyCart = data
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  add(product) {
    if (product instanceof Product) {
      const { id, quantity } = product
      return fetch(`/product/create/${id}?q=${quantity}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.items = [
              ...this.items,
              product
            ]
            return data
          }
          throw new Error('D:')
        })
    }
    else {
      console.warn('product debe ser una instancia de Bsale.Product')
    }
  }

  update(product) {
    if (product instanceof Product) {
      const { id, quantity } = product
      return fetch(`/cart/update_detail/${id}?q=${quantity}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // update local state
            this.items = this.items.map(item => item)
            return data
          }
          throw new Error('D:')
        })
    }
    else {
      console.warn('product debe ser una instancia de Bsale.Product')
    }
  }

  remove(product) {
    if (product instanceof Product) {
      const { id } = product
      return fetch(`/cart/delete_detail/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // update local state
            this.items = this.items.filter(item => item)
            return data
          }
          throw new Error('D:')
        })
    }
    else {
      console.warn('product debe ser una instancia de Bsale.Product')
    }
  }
}
