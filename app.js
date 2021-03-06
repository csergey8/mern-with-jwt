const express = require('express');
const config = require('config');
const mongoose = require('mongoose');


const PORT = config.get('port' || 5000)
const MONGO_URI = config.get('mongoUri');

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))



async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch(e) {
    console.log('Server Error', e.message)
    process.exit(1);
  }

}

start();

app.listen(PORT, () => {
  console.log(`server started at ${PORT} port...`)
})