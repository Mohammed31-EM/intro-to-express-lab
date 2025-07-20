const express = require('express')
const app = express()

app.get('/greetings/:username', (req, res) => {
    console.log(req)
    const username = req.params.username
    res.send(`Hello there, ${username}!`)
})

app.get('/roll/:number', (req, res) => {
  const { number } = req.params;
  const parsedNumber = parseInt(number, 10)

  if (isNaN(parsedNumber)) {
    return res.send("You must specify a number.")
  }

  const roll = Math.floor(Math.random() * (parsedNumber + 1))
  res.send(`You rolled a ${roll}.`)
})

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

app.get('/collectibles/:index', (req, res) => {
  const { index } = req.params
  const idx = parseInt(index, 10)

 
  if (isNaN(idx) || idx < 0 || idx >= collectibles.length) {
    return res.send("This item is not yet in stock. Check back soon!")
  }

  const item = collectibles[idx]
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
})

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get('/shoes', (req, res) => {
  const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

  let filteredShoes = shoes;

  if (minPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
  }

  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type.toLowerCase());
  }

  if (filteredShoes.length === 0) {
    return res.send('No shoes match your criteria.');
  }

  const message = filteredShoes
    .map(shoe => `${shoe.name} - $${shoe.price} (${shoe.type})`)
    .join('\n')

  res.send(message)
})


app.listen(3000, () => {
    console.log('Listening to Port 3000')
})