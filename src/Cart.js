import Product from './Product'
import Variant from './Variant'

export default class Cart {

  constructor(cart) {
    this.items = []
    this.created = null
    this.totalItems = 0
    this.subtotal = 0
    if (cart.items) {
      this.remind(cart)
    }
    else {
      this.get()
    }
  }

  get() {
    fetch('/cart/get_total_cart/')
      .then(res => res.json())
      .then(({ total, items }) => {
        this.items = []
        this.created = Date.now()
        this.totalItems = items
        this.subtotal = total
      })
      .catch(error => {
        console.error(error)
      })
  }

  remind(cart) {
    this.items = cart.items.map(item => {
      const { id, quantity, ...product } = item
      return {
        id,
        product: new Product({ product }),
        quantity
      }
    })
    this.created = Date.now()
    this.totalItems = cart.totalItems
    this.subtotal = cart.subtotal
  }

  add(item, quantity) {
    const variant = item instanceof Variant
    if (variant || item instanceof Product) {
      return fetch(`/product/create/${item[variant ? 'id' : 'variantId']}?q=${quantity}`)
        .then(res => res.json())
        .then(({ success, status, message }) => {
          if (status === 'ok') {
            const newItem = {
              id: null, // temporal
              [variant ? 'variant' : 'product']: item,
              quantity
            }
            this.items = [
              ...this.items,
              newItem
            ]
            return newItem
          }
          else {
            throw new Error(message)
          }
        })
    }
    return Promise.reject('item debe ser una instancia de Bsale.Variant o Bsale.Product')
  }

  update(item, quantity) {
    if (this.items.indexOf(item) !== -1) {
      const { id } = item
      return fetch(`/cart/update_detail/${id}?q=${quantity}`)
        .then(res => res.json())
        .then(({ success, status, message }) => {
          if (status === 'ok') {
            const updatedItem = {
              [item instanceof Variant ? 'variant' : 'product']: item,
              quantity
            }
            this.items = this.items.map(item => {
              if (item.id === id) {
                return updatedItem
              }
              return item
            })
            return updatedItem
          }
          else {
            throw new Error(message)
          }
        })
    }
    return Promise.reject('item no existe en el carro')
  }

  remove(item) {
    if (this.items.indexOf(item) !== -1) {
      const { id } = item
      return fetch(`/cart/delete_detail/${id}`)
        .then(res => res.json())
        .then(({ success, status, message }) => {
          if (status === 'ok') {
            this.items.filter(_item => _item !== item)
            return true
          }
          else {
            throw new Error(message)
          }
        })
    }
    return Promise.reject('item no existe en el carro')
  }
}
