import 'promise/polyfill'
import 'whatwg-fetch'
import Product from './Product'
import Collection from './Collection'
import Cart from './Cart'

const config = JSON.parse(document.head.querySelector('[name="bs-config"]').content)
const cart = new Cart
const dev = location.hostname.indexOf('bsalemarket.com') !== -1 || undefined
const version = '1.0.0'

function tagmanager(event) {
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push(event)
  }
}

function pixel(event, data, custom) {
  if (typeof fbq !== 'undefined') {
    fbq(custom ? 'trackCustom' : 'track', event, data)
  }
}

window.Bsale = {
  tagmanager,
  pixel,
  cart,
  Product,
  Collection,
  config,
  dev,
  version
}
