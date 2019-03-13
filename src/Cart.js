import Product from './Product'

export default class Cart {

  constructor() {
    this.items = []
    this.created = null
    this.legacy = null
    this.get()
  }

  get() {
    fetch('/cart/get_total_cart/')
      .then(res => res.json())
      .then(data => {
        this.items = []
        this.created = Date.now()

        this.legacy = data
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
        .then(({ success, status, message, total }) => {
          if (status === 'ok') {
            this.items = [
              ...this.items,
              product
            ]
            return this
          }
          throw new Error('D:')
        })
    }
    return Promise.reject('product debe ser una instancia de Bsale.Product')
  }

  update(productId, newQuantity) {
    const [{ id }] = this.items.filter(product => product.id === productId)
    return fetch(`/cart/update_detail/${id}?q=${newQuantity}`)
      .then(res => res.json())
      .then(data => {
        // if (data.success) {
        this.items = this.items.map(product => {
          if (product.id === id) {
            return new Bsale.Product(id, newQuantity)
          }
          return product
        })
        return data
        // }
        // throw new Error('D:')
      })
  }

  remove(productId) {
    const [{ id }] = this.items.filter(product => product.id === productId)
    return fetch(`/cart/delete_detail/${id}`)
      .then(res => res.json())
      .then(data => {
        // if (data.success) {
        this.items = this.items.filter(product => product)
        return data
        // }
        // throw new Error('D:')
      })
  }
}
