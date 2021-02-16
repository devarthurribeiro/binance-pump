const Binance = require('node-binance-api')
require('dotenv').config();

const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET
})

const MAX_PRICE = 0.05
const BUY_PRICE = 0.03
const QTY_BUY = 400
const PAIR = 'AKROUSDT'
const ORDER_TYPE = 'LIMIT'

async function watchPrice() {
  try {
    const result = await binance.prices(PAIR)
    const price = result[PAIR]
    console.log(price)
    if(price < MAX_PRICE) {
      console.log(`BUY ${price}`)
      await binance.buy(PAIR, QTY_BUY, BUY_PRICE, {type: ORDER_TYPE})
      return;
    }
  } catch(err) {
    console.log('ERROR '+err)
  }
  watchPrice()
}

watchPrice()