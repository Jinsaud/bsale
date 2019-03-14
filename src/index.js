import 'promise/polyfill'
import 'whatwg-fetch'
import Product from './Product'
import Collection from './Collection'
import Cart from './Cart'

class Bsale {

  constructor({ config, products, collections }) {
    this.config = config
    this.cart = new Cart
    this.version = '1.0.0'
    if (products.length) {
      this.products = products.map(product => new Product(product))
    }
    if (collections.length) {
      this.collections = collections.map(collection => new Collection(collection))
    }
    if (location.hostname.indexOf('bsalemarket.com') !== -1) {
      this.dev = true
    }
    delete window.INITIAL
  }

  tagmanager(event) {
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push(event)
      this.dev && console.log('Tagmanager:', event)
    }
  }

  pixel(event, data, custom) {
    if (typeof fbq !== 'undefined') {
      fbq(custom ? 'trackCustom' : 'track', event, data)
      this.dev && console.log('Pixel:', { event: event, data: data })
    }
  }
}

window.Bsale = new Bsale(window.INITIAL)
