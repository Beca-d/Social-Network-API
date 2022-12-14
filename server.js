const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

// Connection to mongoDB
mongoose.connect(
  process.env.MONODB_URI || `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Debug logging for mongo!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected to the Port = ${PORT}`));