const path = require('path');

const express = require('express');
const cors = require('cors');
const stripe = require("stripe")("sk_test_N5v7KBl71W9YRmIM7UUs3r6o");
const app = express();

app.use(cors());
app.use(require("body-parser").text());


app.post("/payment", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

const port = 9890;

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});
