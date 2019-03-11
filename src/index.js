import Product from './Product'
import Collection from './Collection'
import Cart from './Cart'

const config = JSON.parse(document.head.querySelector('[name="bs-config"]').content)

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
  config,
  tagmanager,
  pixel,
  Product,
  Collection,
  Cart
}
