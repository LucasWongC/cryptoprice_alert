const express = require('express')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ status: 'Up and running' })
})

const { getPrice } = require('./getPrice.js')

getPrice(
  [
    ['BTC-USD', 0.01],
  ],
  5000,
)

app.listen(port, () => console.log('Server started listening!'))
