const axios = require('axios')

let intervalId = undefined

let firstPrices = undefined

async function getPairPrice(pair) {
  const upholdURL = `https://api.uphold.com/v0/ticker/${pair}`
  const rep = await axios.get(upholdURL)

  return rep.data.ask
}

exports.getPrice = async (pairs, interval) => {
  if (intervalId) {
    clearInterval(intervalId)
  }

  firstPrices = new Array(pairs.length)

  intervalId = setInterval(() => {
    getPairsPrice(pairs)
  }, interval)
}

function checkStatus(prevPrice, nextPrice, delta) {
  delta = Math.abs(delta) / 100

  const priceUp = prevPrice * (1 + delta)
  const priceDown = prevPrice * (1 - delta)

  let status = 0

  if (nextPrice > priceUp) status = 1
  else if (nextPrice < priceDown) status = -1

  console.log(prevPrice, nextPrice, status)

  return status
}

async function getPairsPrice(pairs) {
  const pendings = pairs.map((item) => {
    return getPairPrice(item[0])
  })

  const result = await Promise.allSettled(pendings)

  pairs.forEach((item, index) => {
    if (result[index].status != 'fulfilled') return

    const itemPrice = parseFloat(result[index].value)

    if (!firstPrices[index]) {
      firstPrices[index] = itemPrice
    } else {
      const status = checkStatus(firstPrices[index], itemPrice, item[1])

      if (status !== 0) firstPrices[index] = itemPrice

      console.log(status)
    }

    // console.log(itemPrice.value)
  })
}

exports.checkStatus = checkStatus
